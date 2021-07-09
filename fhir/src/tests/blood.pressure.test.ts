import { Loader } from "../loader";
import { BloodPressureMapper } from "../types/mappers/blood.pressure.mapper";
import { PatientMapper } from "../types/mappers/patient.mapper";
import { DoctorMapper } from "../types/mappers/doctor.mapper";


describe('Observation resource: Storage, retrieval', () => {
    it('Given blood pressure domain model, store observation resource to fhir interface, then returned blood pressure details are valid.', async () => {

        var patientModel = PatientMapper.convertJsonObjectToDomainModel();
        var patientEhrId = await Loader.PatientStore.create(patientModel);

        var doctorModel = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorEhrId = await Loader.DoctorStore.create(doctorModel);
        

        var model = BloodPressureMapper.convertJsonObjectToDomainModel();
        model.PatientEhrId = patientEhrId;
        model.RecordedByEhrId = doctorEhrId;

        var bloodPressureEhirId = await Loader.BloodPressureStore.add(model);
        var bloodPressureFhirResource = await Loader.BloodPressureStore.getById(bloodPressureEhirId);

        //Assertions

        var extractedPatientEhrId = bloodPressureFhirResource.subject.reference.split('/')[1];
        expect(extractedPatientEhrId).toEqual(model.PatientEhrId);

        var extractedUnit = bloodPressureFhirResource.component[0].valueQuantity.unit;
        expect(extractedUnit).toEqual(model.Unit);

        var extractedRecordDate = bloodPressureFhirResource.effectiveDateTime;
        expect(extractedRecordDate).toEqual(model.RecordDate);

        var extractedRecordedByEhrId = bloodPressureFhirResource.performer[0].reference.split('/')[1];
        expect(extractedRecordedByEhrId).toEqual(model.RecordedByEhrId);

        var extractedBloodPressureSystolic = bloodPressureFhirResource.component[0].valueQuantity.value;
        expect(extractedBloodPressureSystolic).toEqual(model.BloodPressureSystolic);

        var extractedBloodPressureDiastolic = bloodPressureFhirResource.component[1].valueQuantity.value;
        expect(extractedBloodPressureDiastolic).toEqual(model.BloodPressureDiastolic);

        // For now just check if Visit Id exists
        var extractedVisitId = bloodPressureFhirResource.id;
        expect(extractedVisitId).toBeTruthy();

    });
});
