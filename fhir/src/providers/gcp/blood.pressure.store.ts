import { Helper } from '../../common/helper';
import { BloodPressureDomainModel } from '../../types/domain.types/blood.pressure.domain.types';
import { IBloodPressureStore } from '../../interfaces/blood.pressure.store.interface';
import { GcpHelper } from './helper.gcp';
import { healthcare_v1 } from 'googleapis';

////////////////////////////////////////////////////////////////////////////////

export class GcpBloodPressureStore implements IBloodPressureStore {

    add = async (model: BloodPressureDomainModel): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var body = this.createBloodPressureFhirResource(model);
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

    update = async (resourceId:string, updates: BloodPressureDomainModel): Promise<any> => {

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
        const body: healthcare_v1.Schema$HttpBody = this.updateBloodPressureFhirResource(updates, data);
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

    private createBloodPressureFhirResource(model: BloodPressureDomainModel): any {

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
            component: []
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

        if (model.BloodPressureSystolic != null) {
            resource.component.push({
                "code": {
                    "coding": [
                      {
                        "system": "http://loinc.org",
                        "code": "8480-6",
                        "display": "Systolic blood pressure"
                      },
                      {
                        "system": "http://snomed.info/sct",
                        "code": "271649006",
                        "display": "Systolic blood pressure"
                      },
                      {
                        "system": "http://acme.org/devices/clinical-codes",
                        "code": "bp-s",
                        "display": "Systolic Blood pressure"
                      }
                    ]
                  },
                valueQuantity: {
                    value: model.BloodPressureSystolic,
                    system: "http://unitsofmeasure.org",
                    unit: "mmHg",
                    code: "mm[Hg]"
                }
            })
        }

        if (model.BloodPressureDiastolic != null) {
            resource.component.push({
                "code": {
                    "coding": [
                      {
                        "system": "http://loinc.org",
                        "code": "8462-4",
                        "display": "Diastolic blood pressure"
                      }
                    ]
                  },
                valueQuantity: {
                    value: model.BloodPressureDiastolic,
                    unit: "mmHg",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]"
                }
            })
        }
        
        return resource;
    }  
    
    private updateBloodPressureFhirResource(updates: BloodPressureDomainModel, existingResource: any): any {

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

        if (updates.BloodPressureSystolic != null) {
            existingResource.component[0].valueQuantity.value = updates.BloodPressureSystolic
        }

        if (updates.BloodPressureDiastolic != null) {
            existingResource.component[1].valueQuantity.value = updates.BloodPressureDiastolic
        }
        
        return existingResource;
    }


}
