import "reflect-metadata"
import { PatientDomainModel } from "./types/domain.types/patient.domain.types";
import { DiagnosticLabUserDomainModel } from "./types/domain.types/diagnostic.lab.user.domain.types";
import { Loader } from './loader';

import { PatientMapper } from "./types/mappers/patient.mapper";
import { DiagnosticLabUserMapper } from "./types/mappers/diagnostic.lab.user.mapper";
import { BloodPressureMapper } from "./types/mappers/blood.pressure.mapper";
import { DoctorMapper } from "./types/mappers/doctor.mapper";
import { PulseMapper } from "./types/mappers/pulse.mapper";


////////////////////////////////////////////////////////////////////////////////////

export class Runner {

    public static async run() {
        //await Runner.runPatientResourceWorkflows();
        //await Runner.runDoctorResourceWorkflows();
        //await Runner.runBloodPressureResourceWorkflows();
        await Runner.runPulseResourceWorkflows();
        
    }

    //#region Patient

    private static async runPatientResourceWorkflows() {

        var model = PatientMapper.convertJsonObjectToDomainModel();
        var patientFhirId = await Loader.PatientStore.create(model);
        var patientFhirResource = await Loader.PatientStore.getById(patientFhirId);
        var patientResourceStr = JSON.stringify(patientFhirResource, null, 2);
        console.log(patientResourceStr);

        model.BirthDate = new Date("1999-01-03");
        model.FirstName = "Ajinkya";
        model.LastName = "Mhetre";
        model.Email = "Ajinkya.Mhetre@microsoft.com";

        var updatedResource = await Loader.PatientStore.update(patientFhirId, model);
        patientResourceStr = JSON.stringify(updatedResource, null, 2);
        console.log(patientResourceStr);

        await Loader.PatientStore.delete(patientFhirId);
        var existing = await Loader.PatientStore.getById(patientFhirId);
        patientResourceStr = JSON.stringify(existing, null, 2);
        console.log(patientResourceStr);

    }

    private static async runDoctorResourceWorkflows() {
        var model = DoctorMapper.convertJsonObjectToDomainModel();
        var doctorFhirId = await Loader.DoctorStore.create(model);
        var doctorFhirResource = await Loader.DoctorStore.getById(doctorFhirId);
        var doctorResourceStr = JSON.stringify(doctorFhirResource, null, 2);
        console.log(doctorResourceStr);
    }

    private static async runBloodPressureResourceWorkflows() {
        var model = BloodPressureMapper.convertJsonObjectToDomainModel();
        var bloodPressureEhrId = await Loader.BloodPressureStore.add(model);
        var bloodPressureEhrResource = await Loader.BloodPressureStore.getById(bloodPressureEhrId);
        var bloodPressureResourceStr = JSON.stringify(bloodPressureEhrResource, null, 2);
        console.log(bloodPressureResourceStr);

        model.BloodPressureSystolic = 85;
        model.BloodPressureDiastolic = 125;
        
        var updatedResource = await Loader.BloodPressureStore.update(bloodPressureEhrId, model);
        bloodPressureResourceStr = JSON.stringify(updatedResource, null, 2);
        console.log(bloodPressureResourceStr);

        await Loader.BloodPressureStore.delete(bloodPressureEhrId);
        var existing = await Loader.BloodPressureStore.getById(bloodPressureEhrId);
        bloodPressureResourceStr = JSON.stringify(existing, null, 2);
        console.log(bloodPressureResourceStr);

    }

    private static async runPulseResourceWorkflows() {
        var model = PulseMapper.convertJsonObjectToDomainModel();
        var pulseEhrId = await Loader.PulseStore.add(model);
        var pulseEhrResource = await Loader.PulseStore.getById(pulseEhrId);
        var pulseResourceStr = JSON.stringify(pulseEhrResource, null, 2);
        console.log(pulseResourceStr);

        
        var updatedResource = await Loader.PulseStore.update(pulseEhrId, model);
        pulseResourceStr = JSON.stringify(updatedResource, null, 2);
        console.log(pulseResourceStr);

        await Loader.PulseStore.delete(pulseEhrId);
        var existing = await Loader.PulseStore.getById(pulseEhrId);
        pulseResourceStr = JSON.stringify(existing, null, 2);
        console.log(pulseResourceStr);

    }

}
export class Runner1 {

    public static async run() {
        await Runner1.runDiagnosticLabUserResourceWorkflows();
    }

    //#region DiagnosticLabUser

    private static async runDiagnosticLabUserResourceWorkflows() {
        var model = DiagnosticLabUserMapper.convertJsonObjectToDomainModel();
        var diagnosticlabuserFhirId = await Loader.DiagnosticLabUserStore.create(model);
        var diagnosticlabuserFhirResource = await Loader.DiagnosticLabUserStore.getById(diagnosticlabuserFhirId);
        var diagnosticlabuserResourceStr = JSON.stringify(diagnosticlabuserFhirResource, null, 2);
        console.log(diagnosticlabuserResourceStr);
    }
    //#endregion
    
}

