
import { PharmacyDomainModel, PharmacySearchFilters } from '../types/domain.types/pharmacy.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IPharmacyStore {
    create(pharmacyDomainModel: PharmacyDomainModel): Promise<any>;
    search(filter: PharmacySearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: PharmacyDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
