import { Loader } from "../loader";
import { HospitalMapper } from "../types/mappers/hospital.mapper";


describe('Hospital resource: Storage, retrieval', () => {
    it('Given hospital domain model, store hospital resource to fhir interface, then returned hospital details are valid.', async () => {

        var model = HospitalMapper.convertJsonObjectToDomainModel();
        var hospitalFhirId = await Loader.HospitalStore.create(model);
        var hospitalFhirResource = await Loader.HospitalStore.getById(hospitalFhirId);

        //Assertions
        var extractedName = hospitalFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = hospitalFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = hospitalFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = hospitalFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = hospitalFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
});
