import { Loader } from "../loader";
import { PharmacistMapper } from "../types/mappers/pharmacist.mapper";


describe('Pharmacist resource: Storage, retrieval', () => {
    it('Given pharmacist domain model, store pharmacist resource to fhir interface, then returned pharmacist details are valid.', async () => {

        var model = PharmacistMapper.convertJsonObjectToDomainModel();
        var pharmacistFhirId = await Loader.PharmacistStore.create(model);
        var pharmacistFhirResource = await Loader.PharmacistStore.getById(pharmacistFhirId);

        //Assertions
        var extractedName = pharmacistFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = pharmacistFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = pharmacistFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = pharmacistFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = pharmacistFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
}); 
