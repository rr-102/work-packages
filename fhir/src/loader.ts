import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';

import { StorageService } from './services/storage.service';
import { PatientStore } from './services/patient.store';
//import { DoctorVisitStore } from './services/doctor.visit.store';
import { Injector } from './injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

Injector.registerInjections(container);

export class Loader {

    //#region static member variables

    private static _storageService: StorageService = container.resolve(StorageService);
    private static _patientStore: PatientStore = container.resolve(PatientStore);

    private static _container: DependencyContainer = container;

    //#endregion

    //#region static properties

    public static get StorageService() {
        return Loader._storageService;
    }
    
    public static get PatientStore() {
        return Loader._patientStore;
    }

    // public static get DoctorVisitStore() {
    //     return Loader._doctorVisitStore;
    // }

    //#endregion

    public static init = async () => {
        try {

            Loader._storageService = container.resolve(StorageService);

            //Add other resource stores here...
            Loader._patientStore = container.resolve(PatientStore);
            //Loader._doctorVisitStore = container.resolve(DoctorVisitStore);

            //Finally intitialize Fhir storage provider 
            await Loader._storageService.init();

        } catch (error) {
            console.log(error.message);
        }
    };


}

