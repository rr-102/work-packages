import { Helper } from '../../common/helper';
import { PharmacistDomainModel, PharmacistSearchFilters } from '../../types/domain.types/pharmacist.domain.types';
import { IPharmacistStore } from '../../interfaces/pharmacist.store.interface';
import { GcpHelper } from './helper.gcp';
import { healthcare_v1 } from 'googleapis';

////////////////////////////////////////////////////////////////////////////////

export class GcpPharmacistStore implements IPharmacistStore {

    create = async (model: PharmacistDomainModel): Promise<any> => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var body = this.createPharmacistFhirResource(model);
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
            const request = { parent, type: 'Pharmacist', requestBody: body };
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
            const resourceType = 'Pharmacist';
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
    
    search = async (filter: PharmacistSearchFilters): Promise<any> => {
        
    };

    update = async (resourceId:string, updates: PharmacistDomainModel): Promise<any> => {

        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        const resourceType = 'Pharmacist';

        //Get the existing resource
        const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/${resourceType}/${resourceId}`;
        var existingResource = await g.projects.locations.datasets.fhirStores.fhir.read(
            { name: parent }
        );
        var data:any = existingResource.data;
        //delete data.id; //Remove id from the resource
        
        //Construct updated body
        const body: healthcare_v1.Schema$HttpBody = this.updatePharmacistFhirResource(updates, data);
        const updatedResource = await g.projects.locations.datasets.fhirStores.fhir.update({
            name: parent,
            requestBody: body,
        });
        var data: any = updatedResource.data;
        console.log(`Updated ${resourceType} resource:\n`, updatedResource.data);
        return data;
    };

    delete = async (resourceId: string): Promise<any> => {
        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        const resourceType = 'Pharmacist';

        //Get the existing resource
        const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/${resourceType}/${resourceId}`;
        await g.projects.locations.datasets.fhirStores.fhir.delete(
            { name: parent }
        );
    };

     //#region Private methods

    private createPharmacistFhirResource(model: PharmacistDomainModel): any {

        var nameObj = this.getPharmacistFhirName(model);

        var resource = {
            resourceType : "Pharmacist",
            name: [nameObj],
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

    private getPharmacistFhirName(model: PharmacistDomainModel) {

        var givenNames = [];

        if (model.FirstName != null) {
            givenNames.push(model.FirstName);
        } else {
            givenNames.push('');
        }
        if (model.MiddleName != null) {
            givenNames.push(model.MiddleName);
        } else {
            givenNames.push('');
        }

        var familyName = model.LastName != null ? model.LastName : '';
        var prefixes = [];
        if (model.Prefix != null) {
            prefixes.push(model.Prefix);
        }

        var nameObj = {
            use: "official",
            given: givenNames,
            family: familyName,
            prefix: prefixes
        };
        return nameObj;
    }

    private updatePharmacistFhirResource(updates: PharmacistDomainModel, existingResource: any): any {

        existingResource.resourceType = "Practitioner";

        if (existingResource.name.length == 0) {
            existingResource.name = this.getPharmacistFhirName(updates);
        } 
        else {
            var nameObj = existingResource.name[0];
            if (updates.FirstName != null) {
                if (nameObj.given.length > 0) {
                    nameObj.given[0] = updates.FirstName;
                } else {
                    nameObj.given.push(updates.FirstName);
                }
            }
            if (updates.MiddleName != null) {
                if (nameObj.given.length > 1) {
                    nameObj.given[1] = updates.MiddleName;
                } else {
                    nameObj.given.push(updates.MiddleName);
                }
            }
            if (updates.LastName != null) {
                nameObj.family = updates.LastName;
            }
            if (updates.Prefix != null) {
                nameObj.prefix = [];
                nameObj.prefix.push(updates.Prefix);
            }
            existingResource.name[0] = nameObj;
        }
        if(updates.Gender != null) {
            existingResource.gender = updates.Gender.toLowerCase();
        }
        if(updates.BirthDate != null) {
            var str = Helper.formatDate(updates.BirthDate);
            existingResource.birthDate = str;
        }
        if(updates.Phone != null) {
            for (var i = 0; i < existingResource.telecom.length; i++) {
                if (existingResource.telecom[i].system === 'phone') {
                    existingResource.telecom[i].value = updates.Phone;
                }
            }
        }
        if(updates.Email != null) {
            for (var i = 0; i < existingResource.telecom.length; i++) {
                if (existingResource.telecom[i].system === 'email') {
                    existingResource.telecom[i].value = updates.Email;
                }
            }
        }

        if(updates.Address != null) {
            var address = {
                line: [],
                city: updates.Address.City ?? '',
                district: updates.Address.District ?? '',
                postalCode: updates.Address.PostalCode ?? ''
            };
            if(updates.Address.AddressLine != null) {
                address.line.push(updates.Address.AddressLine);
            }
            if(existingResource.address.length > 0) {
                existingResource.address.pop();
            }
            existingResource.address.push(address);
        }
        return existingResource;
    }

     //#endregion
}