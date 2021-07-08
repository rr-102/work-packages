import "reflect-metadata"
import { PatientDomainModel } from "./types/domain.types/patient.domain.types";
import { DiagnosticLabUserDomainModel } from "./types/domain.types/diagnostic.lab.user.domain.types";
import { Loader } from './loader';

import { PatientMapper } from "./types/mappers/patient.mapper";
import { DiagnosticLabUserMapper } from "./types/mappers/diagnostic.lab.user.mapper";
import { BloodPressureMapper } from "./types/mappers/blood.pressure.mapper";
import { DoctorMapper } from "./types/mappers/doctor.mapper";


////////////////////////////////////////////////////////////////////////////////////

export class Runner {

    public static async run() {
        await Runner.runPatientResourceWorkflows();
        await Runner.runDoctorResourceWorkflows();
        await Runner.runBloodPressureResourceWorkflows();
        
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
        var bloodPressureFhirId = await Loader.BloodPressureStore.add(model);
        var bloodPressureFhirResource = await Loader.BloodPressureStore.getById(bloodPressureFhirId);
        var bloodPressureResourceStr = JSON.stringify(bloodPressureFhirResource, null, 2);
        console.log(bloodPressureResourceStr);
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

