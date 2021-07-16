import { Helper } from '../../common/helper';
import { TemperatureDomainModel } from '../../types/domain.types/temperature.domain.types';
import { ITemperatureStore } from '../../interfaces/temperature.store.interface';
import { GcpHelper } from './helper.gcp';
import { healthcare_v1 } from 'googleapis';

////////////////////////////////////////////////////////////////////////////////

export class GcpTemperatureStore implements ITemperatureStore {

    add = async (model: TemperatureDomainModel): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var body = this.createTemperatureFhirResource(model);
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

    update = async (resourceId:string, updates: TemperatureDomainModel): Promise<any> => {

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
        const body: healthcare_v1.Schema$HttpBody = this.updateTemperatureFhirResource(updates, data);
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

    private createTemperatureFhirResource(model: TemperatureDomainModel): any {

        var resource = {
            resourceType : "Observation",
            id: "temperature",
            status: "final",
            code: {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "vital signs"
                  }
                ]
            },
            component: [],
            valueQuantity: {
                "value": 99,
                "unit": "°F",
                "system": "http://unitsofmeasure.org",
                "code": "Farenheit"
              }, 
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
    
    private updateTemperatureFhirResource(updates: TemperatureDomainModel, existingResource: any): any {

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