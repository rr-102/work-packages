import { Loader } from "../loader";
import { PulseMapper } from "../types/mappers/pulse.mapper";
import { PatientMapper } from "../types/mappers/patient.mapper";
import { DoctorMapper } from "../types/mappers/doctor.mapper";


describe('Observation resource: Storage, retrieval', () => {
    it('Given pulse domain model, store observation resource to fhir interface, then returned pulse details are valid.', async () => {

        var patientModel = PatientMapper.convertJsonObjectToDomainModel();
        var patientEhrId = await Loader.PatientStore.create(patientModel);

        var doctorModel = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorEhrId = await Loader.DoctorStore.create(doctorModel);
        

        var model = PulseMapper.convertJsonObjectToDomainModel();
        model.PatientEhrId = patientEhrId;
        model.RecordedByEhrId = doctorEhrId;

        var pulseEhirId = await Loader.PulseStore.add(model);
        var pulseFhirResource = await Loader.PulseStore.getById(pulseEhirId);

        //Assertions

        var extractedPatientEhrId = pulseFhirResource.subject.reference.split('/')[1];
        expect(extractedPatientEhrId).toEqual(model.PatientEhrId);

        var extractedUnit = pulseFhirResource.valueQuantity.unit;
        expect(extractedUnit).toEqual(model.Unit);

        var extractedRecordDate = pulseFhirResource.effectiveDateTime;
        expect(extractedRecordDate).toEqual(model.RecordDate);

        var extractedRecordedByEhrId = pulseFhirResource.performer[0].reference.split('/')[1];
        expect(extractedRecordedByEhrId).toEqual(model.RecordedByEhrId);


        // For now just check if Visit Id exists
        var extractedVisitId = pulseFhirResource.id;
        expect(extractedVisitId).toBeTruthy();

    });
});
