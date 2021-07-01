import { Helper } from '../../common/helper';
import { HospitalDomainModel } from '../../types/domain.types/hospital.domain.types';
import { IHospitalStore } from '../../interfaces/hospital.store.interface';
import { GcpHelper } from './helper.gcp';

////////////////////////////////////////////////////////////////////////////////

export class GcpHospitalStore implements IHospitalStore {

    create = async (model: HospitalDomainModel): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var body = this.createHospitalFhirResource(model);
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
            const request = { parent, type: 'Hospital', requestBody: body };
            const resource = await g.projects.locations.datasets.fhirStores.fhir.create(
                request
            );
            var data: any = resource.data;
            var resourceStr = JSON.stringify(data, null, 2);
            //console.log(`Created FHIR resource ${resourceStr}`);
            return data.id;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    getById = async (resourceId: string): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const resourceType = 'Hospital';
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

    private createHospitalFhirResource(model: HospitalDomainModel): any {

        var givenNames = [];
        if(model.FirstName != null) {
            givenNames.push(model.FirstName);
        }
        if(model.MiddleName != null) {
            givenNames.push(model.MiddleName);
        }
        var faamilyName = model.LastName != null ? model.LastName : '';
        var prefixes = [];
        if(model.Prefix != null) {
            prefixes.push(model.Prefix);
        }

        var resource = {
            resourceType : "Hospital",
            name: [
                {
                    use: "official",
                    given: givenNames,
                    family: faamilyName,
                    prefix: prefixes
                }
            ],
            gender: model.Gender != null ? model.Gender.toLowerCase() : 'unknown',
            telecom: [],
            address: []
        }
        
        if(model.BirthDate != null) {
            var str = Helper.formatDate(model.BirthDate);
            resource['birthDate'] = str;
        }

        if(model.Phone != null) {
            resource.telecom.push({
                system: "phone",
                use: "mobile",
                value: model.Phone
            });
        }
        if(model.Email != null) {
            resource.telecom.push({
                system: "email",
                value: model.Email
            });
        }
        if(model.Address != null) {
            var address = {
                line: [],
                city: model.Address.City ?? '',
                district: model.Address.District ?? '',
                postalCode: model.Address.PostalCode ?? ''
            };
            if(model.Address.AddressLine != null) {
                address.line.push(model.Address.AddressLine);
            }
            resource.address.push(address);
        }
        return resource;
    }

     //#endregion
}

