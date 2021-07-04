import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';

import { StorageService } from './services/storage.service';
import { PatientStore } from './services/patient.store';
import { LabOrganizationStore } from './services/lab.organization.store';
//import { DoctorVisitStore } from './services/doctor.visit.store';
import { Injector } from './injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

Injector.registerInjections(container);

export class Loader1 {

    //#region static member variables

    private static _storageService: StorageService = container.resolve(StorageService);
    private static _LabOrganizationStore: LabOrganizationStore = container.resolve(LabOrganizationStore);

    private static _container: DependencyContainer = container;

    //#endregion

    //#region static properties

    public static get StorageService() {
        return Loader1._storageService;
    }
    
    public static get LabOrganizationStore() {
        return Loader1._LabOrganizationStore;
    }

    // public static get DoctorVisitStore() {
    //     return Loader._doctorVisitStore;
    // }

    //#endregion

    public static init = async () => {
        try {

            Loader1._storageService = container.resolve(StorageService);

            //Add other resource stores here...
            Loader1._LabOrganizationStore = container.resolve(LabOrganizationStore);
            //Loader._doctorVisitStore = container.resolve(DoctorVisitStore);

            //Finally intitialize Fhir storage provider 
            await Loader1._storageService.init();

        } catch (error) {
            console.log(error.message);
        }
    };


}

export class Loader {

    //#region static member variables

    private static _storageService: StorageService = container.resolve(StorageService);
    private static _PatientStore: PatientStore = container.resolve(PatientStore);

    private static _container: DependencyContainer = container;

    //#endregion

    //#region static properties

    public static get StorageService() {
        return Loader._storageService;
    }
    
    public static get PatientStore() {
        return Loader._PatientStore;
    }

    // public static get DoctorVisitStore() {
    //     return Loader._doctorVisitStore;
    // }

    //#endregion

    public static init = async () => {
        try {

            Loader._storageService = container.resolve(StorageService);

            //Add other resource stores here...
            Loader._PatientStore = container.resolve(PatientStore);
            //Loader._doctorVisitStore = container.resolve(DoctorVisitStore);

            //Finally intitialize Fhir storage provider 
            await Loader._storageService.init();

        } catch (error) {
            console.log(error.message);
        }
    };


}

