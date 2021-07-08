import "reflect-metadata"
import { PatientDomainModel } from "./types/domain.types/patient.domain.types";
import { Loader } from './loader';

import { PatientMapper } from "./types/mappers/patient.mapper";

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
    
    //#endregion

}

