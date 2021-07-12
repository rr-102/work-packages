
import { TemperatureDomainModel, TemperatureSearchFilters } from '../types/domain.types/temperature.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface ITemperatureStore {
    add(temperatureDomainModel: TemperatureDomainModel): Promise<any>;
    search(filter: TemperatureSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: TemperatureDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
