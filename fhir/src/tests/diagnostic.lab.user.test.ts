import { Loader } from "../loader";
import { DiagnosticLabUserMapper } from "../types/mappers/diagnostic.lab.user.mapper";


describe('diagnosticlabuser resource: Storage, retrieval', () => {
    it('Given diagnosticlabuser domain model, store diagnosticlabuser resource to fhir interface, then returned diagnosticlabuser details are valid.', async () => {

        var model = DiagnosticLabUserMapper.convertJsonObjectToDomainModel();
        var DiagnosticLabUserFhirId = await Loader.DiagnosticLabUserStore.create(model);
        var DiagnosticLabUserFhirResource = await Loader.DiagnosticLabUserStore.getById(DiagnosticLabUserFhirId);

        //Assertions
        var extractedName = DiagnosticLabUserFhirResource.name[0].family;
        expect(extractedName).toEqual(model.LastName);

        var extractedBirthdate = DiagnosticLabUserFhirResource.birthDate;
        expect(extractedBirthdate).toEqual(model.BirthDate);

        var extractedGender = DiagnosticLabUserFhirResource.gender;
        expect(extractedGender).toEqual(model.Gender.toLowerCase());

        var phoneElement = DiagnosticLabUserFhirResource.telecom.find(function (e) {
            return e.system === 'phone';
        });
        var extractedPhone = phoneElement ? phoneElement.value : '';
        expect(extractedPhone).toEqual(model.Phone);

        var emailElement = DiagnosticLabUserFhirResource.telecom.find(function (e) {
            return e.system === 'email';
        });
        var extractedEmail = emailElement ? emailElement.value : '';
        expect(extractedEmail.toLowerCase()).toEqual(model.Email.toLowerCase());
    });
});