import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';

import { GcpStorageService } from "./providers/gcp/storage.service";
import { GcpPatientStore } from "./providers/gcp/patient.store";
import { GcpHospitalStore } from "./providers/gcp/hospital.store";
//import { GcpDoctorVisitStore } from "./providers/gcp/doctor.visit.store";

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Injector {

    static registerInjections(container: DependencyContainer) {

        container.register('IStorageService', GcpStorageService);
        container.register('IPatientStore', GcpPatientStore);
        container.register('IHospitalStore', GcpHospitalStore);
        //container.register('IDoctorVisitStore', GcpDoctorVisitStore);

    }
}
