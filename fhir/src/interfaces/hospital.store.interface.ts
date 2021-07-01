
import { HospitalDomainModel, HospitalSearchFilters } from '../types/domain.types/hospital.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IHospitalStore {
    create(hospitalDomainModel: HospitalDomainModel): Promise<any>;
    search(filter: HospitalSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: HospitalDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}

