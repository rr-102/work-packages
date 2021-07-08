import { Helper } from '../../common/helper';
import { BloodPressureDomainModel } from '../../types/domain.types/blood.pressure.domain.types';
import { IBloodPressureStore } from '../../interfaces/blood.pressure.store.interface';
import { GcpHelper } from './helper.gcp';

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
            console.log(error.message);
            throw error;
        }
    };
    
    search = async (filter: any): Promise<any> => {};

    update = async (updates: any): Promise<any> => {};

    delete = async (id: string): Promise<any> => {};

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

        if (model.PatientEhirId != null) {
            resource['subject'] = {
                reference: `Patient/${model.PatientEhirId}`
            }
        }

        /*if (model.VisitEhirId != null) {
            resource['VisitId'] = model.VisitEhirId
        }*/

        if (model.RecordDate != null) {
            resource['effectiveDateTime'] = Helper.formatDate(model.RecordDate)
        }

        if (model.RecordedByEhirId != null) {
            resource['performer'] = [
                {
                    reference: `Practitioner/${model.RecordedByEhirId}`
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
        
}
