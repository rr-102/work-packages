import "reflect-metadata"
import { PatientDomainModel } from "./types/domain.types/patient.domain.types";
import { DiagnosticLabUserDomainModel } from "./types/domain.types/diagnostic.lab.user.domain.types";
import { Loader } from './loader';

import { PatientMapper } from "./types/mappers/patient.mapper";
import { DiagnosticLabUserMapper } from "./types/mappers/diagnostic.lab.user.mapper";

////////////////////////////////////////////////////////////////////////////////////

export class Runner {

    public static async run() {
        await Runner.runPatientResourceWorkflows();
    }

    //#region Patient

    private static async runPatientResourceWorkflows() {
        var model = PatientMapper.convertJsonObjectToDomainModel();
        var patientFhirId = await Loader.PatientStore.create(model);
        var patientFhirResource = await Loader.PatientStore.getById(patientFhirId);
        var patientResourceStr = JSON.stringify(patientFhirResource, null, 2);
        console.log(patientResourceStr);
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

