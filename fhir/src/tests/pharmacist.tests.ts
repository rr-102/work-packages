import { Loader } from "../loader";
import { PharmacistMapper } from "../types/mappers/pharmacist.mapper";


describe('Pharmacist resource: Storage, retrieval', () => {
    it('Given pharmacist domain model, store pharmacist resource to fhir interface, then returned pharmacist details are valid.', async () => {

        var model = PharmacistMapper.convertJsonObjectToDomainModel();
        var PharmacistFhirId = await Loader.PharmacistStore.create(model);
        var PharmacistFhirResource = await Loader.PharmacistStore.getById(PharmacistFhirId);

        //Assertions
        var extractedName = PharmacistFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = PharmacistFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = PharmacistFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = PharmacistFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = PharmacistFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
}); 
