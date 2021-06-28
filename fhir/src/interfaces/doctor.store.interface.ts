
import { DoctorDomainModel, DoctorSearchFilters } from '../types/domain.types/doctor.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IDoctorStore {
    create(DoctorDomainModel: DoctorDomainModel): Promise<any>;
    search(filter: DoctorSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: DoctorDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
