import { Loader } from "../loader";
import { BloodPressureMapper } from "../types/mappers/blood.pressure.mapper";
import { PatientMapper } from "../types/mappers/patient.mapper";
import { DoctorMapper } from "../types/mappers/doctor.mapper";


describe('Observation resource: Storage, retrieval', () => {
    it('Given blood pressure domain model, store observation resource to fhir interface, then returned blood pressure details are valid.', async () => {

        var patientModel = PatientMapper.convertJsonObjectToDomainModel();
        var patientFhirId = await Loader.PatientStore.create(patientModel);

        var doctorModel = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorFhirId = await Loader.DoctorStore.create(doctorModel);
        

        var model = BloodPressureMapper.convertJsonObjectToDomainModel();
        model.PatientId = patientFhirId;
        model.RecordedBy = doctorFhirId;

        var bloodPressureFhirId = await Loader.BloodPressureStore.add(model);
        var bloodPressureFhirResource = await Loader.BloodPressureStore.getById(bloodPressureFhirId);

        //Assertions

        var extractedPatientId = bloodPressureFhirResource.subject.reference.split('/')[1];
        expect(extractedPatientId).toEqual(model.PatientId);

        var extractedUnit = bloodPressureFhirResource.component[0].valueQuantity.unit;
        expect(extractedUnit).toEqual(model.Unit);

        var extractedRecordDate = bloodPressureFhirResource.effectiveDateTime;
        expect(extractedRecordDate).toEqual(model.RecordDate);

        var extractedRecordedBy = bloodPressureFhirResource.performer[0].reference.split('/')[1];
        expect(extractedRecordedBy).toEqual(model.RecordedBy);

        var extractedBloodPressureSystolic = bloodPressureFhirResource.component[0].valueQuantity.value;
        expect(extractedBloodPressureSystolic).toEqual(model.BloodPressureSystolic);

        var extractedBloodPressureDiastolic = bloodPressureFhirResource.component[1].valueQuantity.value;
        expect(extractedBloodPressureDiastolic).toEqual(model.BloodPressureDiastolic);

        // For now just check if Visit Id exists
        var extractedVisitId = bloodPressureFhirResource.id;
        expect(extractedVisitId).toBeTruthy();

    });
});
