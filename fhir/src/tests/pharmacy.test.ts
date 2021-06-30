import { Loader } from "../loader";
import { PharmacyMapper } from "../types/mappers/pharmacy.mapper";


describe('Pharmacy resource: Storage, retrieval', () => {
    it('Given pharmacy domain model, store pharmacy resource to fhir interface, then returned pharmacy details are valid.', async () => {

        var model = PharmacyMapper.convertJsonObjectToDomainModel();
        var pharmacyFhirId = await Loader.PharmacyStore.create(model);
        var pharmacyFhirResource = await Loader.PharmacyStore.getById(pharmacyFhirId);

        //Assertions
        var extractedName = pharmacyFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = pharmacyFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = pharmacyFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = pharmacyFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = pharmacyFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
});
