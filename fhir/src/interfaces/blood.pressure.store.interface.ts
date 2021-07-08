
import { BloodPressureDomainModel, BloodPressureSearchFilters } from '../types/domain.types/blood.pressure.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IBloodPressureStore {
    add(bloodPressureDomainModel: BloodPressureDomainModel): Promise<any>;
    search(filter: BloodPressureSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: BloodPressureDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
