import { Helper } from '../../common/helper';
import { PulseDomainModel } from '../../types/domain.types/pulse.domain.types';
import { IPulseStore } from '../../interfaces/pulse.store.interface';
import { GcpHelper } from './helper.gcp';
import { healthcare_v1 } from 'googleapis';

////////////////////////////////////////////////////////////////////////////////

export class GcpPulseStore implements IPulseStore {

    add = async (model: PulseDomainModel): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var body = this.createPulseFhirResource(model);
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
            const request = { parent, type: 'Observation', requestBody: body };
            const resource = await g.projects.locations.datasets.fhirStores.fhir.create(
                request
            );
            var data: any = resource.data;
            var resourceStr = JSON.stringify(data, null, 2);
            //console.log(`Created FHIR resource ${resourceStr}`);
            return data.id;
        } catch (error) {
            console.log("Error:: ", JSON.stringify(error));
            throw error;
        }
    };

    getById = async (resourceId: string): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const resourceType = 'Observation';
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/${resourceType}/${resourceId}`;
            const resource = await g.projects.locations.datasets.fhirStores.fhir.read(
                { name: parent }
            );
            var data: any = resource.data;
            //var resourceStr = JSON.stringify(data, null, 2);
            //console.log(`Created FHIR resource ${resourceStr}`);
            return data;
        } catch (error) {
            var errorMessage = Helper.checkObj(error.message);
           if (errorMessage != null) {
               if (errorMessage.hasOwnProperty('issue')) {
                   var issue = errorMessage.issue[0];
                   console.log(issue.diagnostics);
                   return null;
               }
           }
           console.log(error.message);
        }
    };
    
    search = async (filter: any): Promise<any> => {};

    update = async (resourceId:string, updates: PulseDomainModel): Promise<any> => {

        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        const resourceType = 'Observation';

        //Get the existing resource
        const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/${resourceType}/${resourceId}`;
        var existingResource = await g.projects.locations.datasets.fhirStores.fhir.read(
            { name: parent }
        );
        var data:any = existingResource.data;

        //Construct updated body
        const body: healthcare_v1.Schema$HttpBody = this.updatePulseFhirResource(updates, data);
        const updatedResource = await g.projects.locations.datasets.fhirStores.fhir.update({
            name: parent,
            requestBody: body,
        });
        var data: any = updatedResource.data;
        console.log(`Updated ${resourceType} resource:\n`, updatedResource.data);
        return data;
    };

    delete = async (resourceId: string): Promise<any> => {
        try {
        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        const resourceType = 'Observation';

        //Get the existing resource
        const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/${resourceType}/${resourceId}`;
        await g.projects.locations.datasets.fhirStores.fhir.delete(
            { name: parent }
        );
    }
    catch (error) {
        console.log("Error:: ", JSON.stringify(error));
        throw error;
    }
    };

     //#region Private methods

    private createPulseFhirResource(model: PulseDomainModel): any {

        var resource = {
            resourceType : "Observation",
            id: "blood-pressure",
            status: "final",
            code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "85354-9",
                    display: "Blood pressure panel with all children optional"
                  }
                ],
                text: "Blood pressure systolic & diastolic"
            },
            component: [],
            valueQuantity: {
                "value": 44,
                "unit": "bpm",
                "system": "http://unitsofmeasure.org",
                "code": "/min"
              }
        }

        if (model.PatientEhrId != null) {
            resource['subject'] = {
                reference: `Patient/${model.PatientEhrId}`
            }
        }

        /*if (model.VisitEhirId != null) {
            resource['VisitId'] = model.VisitEhrId
        }*/

        if (model.RecordDate != null) {
            resource['effectiveDateTime'] = Helper.formatDate(model.RecordDate)
        }

        if (model.RecordedByEhrId != null) {
            resource['performer'] = [
                {
                    reference: `Practitioner/${model.RecordedByEhrId}`
                }
            ]
        }

        return resource;
    }  
    
    private updatePulseFhirResource(updates: PulseDomainModel, existingResource: any): any {

        existingResource.resourceType = "Observation";

        if (updates.PatientEhrId != null) {
            existingResource['subject'] = {
                reference: `Patient/${updates.PatientEhrId}`
            }
        }

        /*if (updates.VisitEhirId != null) {
            existingResource['VisitId'] = updates.VisitEhrId
        }*/

        if (updates.RecordDate != null) {
            existingResource['effectiveDateTime'] = Helper.formatDate(updates.RecordDate)
        }

        if (updates.RecordedByEhrId != null) {
            existingResource['performer'] = [
                {
                    reference: `Practitioner/${updates.RecordedByEhrId}`
                }
            ]
        }

        return existingResource;
    }


}
