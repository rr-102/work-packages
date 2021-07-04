import "reflect-metadata"
import { PatientDomainModel } from "./types/domain.types/patient.domain.types";
import { LabOrganizationDomainModel } from "./types/domain.types/lab.organization.domain.types";
import { Loader1 } from './loader';
import { Loader } from './loader';

import { PatientMapper } from "./types/mappers/patient.mapper";
import { LabOrganizationMapper } from "./types/mappers/lab.organization.mapper";

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
    
    //#endregion

}

export class Runner1 {

    public static async run() {
        await Runner1.runLabOrganizationResourceWorkflows();
    }

    //#region Patient

    private static async runLabOrganizationResourceWorkflows() {
        var model = LabOrganizationMapper.convertJsonObjectToDomainModel();
        var LabOrganizationFhirId = await Loader1.LabOrganizationStore.create(model);
        var LabOrganizationFhirResource = await Loader1.LabOrganizationStore.getById(LabOrganizationFhirId);
        var LabOrganizationResourceStr = JSON.stringify(LabOrganizationFhirResource, null, 2);
        console.log(LabOrganizationResourceStr);
    }
    
    //#endregion

}
