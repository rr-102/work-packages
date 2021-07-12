import { Loader } from "../loader";
import { TemperatureMapper } from "../types/mappers/temperature.mapper";
import { PatientMapper } from "../types/mappers/patient.mapper";
import { DoctorMapper } from "../types/mappers/doctor.mapper";


describe('Observation resource: Storage, retrieval', () => {
    it('Given temperature domain model, store observation resource to fhir interface, then returned temperature details are valid.', async () => {

        var patientModel = PatientMapper.convertJsonObjectToDomainModel();
        var patientEhrId = await Loader.PatientStore.create(patientModel);

        var doctorModel = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorEhrId = await Loader.DoctorStore.create(doctorModel);
        

        var model = TemperatureMapper.convertJsonObjectToDomainModel();
        model.PatientEhrId = patientEhrId;
        model.RecordedByEhrId = doctorEhrId;

        var temperatureEhirId = await Loader.TemperatureStore.add(model);
        var temperatureFhirResource = await Loader.TemperatureStore.getById(temperatureEhirId);

        //Assertions

        var extractedPatientEhrId = temperatureFhirResource.subject.reference.split('/')[1];
        expect(extractedPatientEhrId).toEqual(model.PatientEhrId);

        var extractedUnit = temperatureFhirResource.component[0].valueQuantity.unit;
        expect(extractedUnit).toEqual(model.Unit);

        var extractedRecordDate = temperatureFhirResource.effectiveDateTime;
        expect(extractedRecordDate).toEqual(model.RecordDate);

        var extractedRecordedByEhrId = temperatureFhirResource.performer[0].reference.split('/')[1];
        expect(extractedRecordedByEhrId).toEqual(model.RecordedByEhrId);


        // For now just check if Visit Id exists
        var extractedVisitId = temperatureFhirResource.id;
        expect(extractedVisitId).toBeTruthy();

    });
});
