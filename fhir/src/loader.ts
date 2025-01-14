import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { StorageService } from './services/storage.service';
import { PatientStore } from './services/patient.store';
import { DiagnosticLabUserStore } from './services/diagnostic.lab.user.store';
import { DoctorStore } from './services/doctor.store';
import { PharmacistStore } from './services/pharmacist.store';
import { BloodPressureStore } from './services/blood.pressure.store';

//import { DoctorVisitStore } from './services/doctor.visit.store';
import { Injector } from './injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

Injector.registerInjections(container);

export class Loader {

    //#region static member variables

    private static _storageService: StorageService = container.resolve(StorageService);
    private static _patientStore: PatientStore = container.resolve(PatientStore);
    private static _diagnosticlabuserStore: DiagnosticLabUserStore = container.resolve(DiagnosticLabUserStore);
    private static _doctorStore: DoctorStore = container.resolve(DoctorStore);
    private static _pharmacistStore: PharmacistStore = container.resolve(PharmacistStore);
    private static _bloodPressureStore: BloodPressureStore = container.resolve(BloodPressureStore);

    private static _container: DependencyContainer = container;

    //#endregion

    //#region static properties

    public static get StorageService() {
        return Loader._storageService;
    }
    
    public static get PatientStore() {
        return Loader._patientStore;
    }
    public static get DiagnosticLabUserStore() {
        return Loader._diagnosticlabuserStore;
    }

    public static get DoctorStore() {
        return Loader._doctorStore;
    }

    public static get PharmacistStore() {
        return Loader._pharmacistStore;
    }

    public static get BloodPressureStore() {
        return Loader._bloodPressureStore;
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

            Loader._diagnosticlabuserStore = container.resolve(DiagnosticLabUserStore);
            Loader._bloodPressureStore = container.resolve(BloodPressureStore);
            //Loader._doctorVisitStore = container.resolve(DoctorVisitStore);

            Loader._doctorStore = container.resolve(DoctorStore);

            Loader._pharmacistStore = container.resolve(PharmacistStore);

            //Finally intitialize Fhir storage provider 
            await Loader._storageService.init();

        } catch (error) {
            console.log(error.message);
        }
    };


}

