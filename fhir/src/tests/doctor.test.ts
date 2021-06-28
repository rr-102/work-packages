import { Loader } from "../loader";
import { DoctorMapper } from "../types/mappers/doctor.mapper";


describe('Doctor resource: Storage, retrieval', () => {
    it('Given doctor domain model, store doctor resource to fhir interface, then returned doctor details are valid.', async () => {

        var model = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorFhirId = await Loader.DoctorStore.create(model);
        var doctorFhirResource = await Loader.DoctorStore.getById(doctorFhirId);

        //Assertions
        var extractedName = doctorFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = doctorFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = doctorFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = doctorFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = doctorFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
}); 
