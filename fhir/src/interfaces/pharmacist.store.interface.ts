
import { PharmacistDomainModel, PharmacistSearchFilters } from '../types/domain.types/pharmacist.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IPharmacistStore {
    create(PharmacistDomainModel: PharmacistDomainModel): Promise<any>;
    search(filter: PharmacistSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: PharmacistDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
