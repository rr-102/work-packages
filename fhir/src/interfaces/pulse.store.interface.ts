
import { PulseDomainModel, PulseSearchFilters } from '../types/domain.types/pulse.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IPulseStore {
    add(pulseDomainModel: PulseDomainModel): Promise<any>;
    search(filter: PulseSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: PulseDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
