import 'reflect-metadata';
import { ITemperatureStore } from '../interfaces/temperature.store.interface';
import { injectable, inject } from "tsyringe";
import { TemperatureDomainModel, TemperatureSearchFilters } from '../types/domain.types/temperature.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class TemperatureStore {

    constructor(@inject('ITemperatureStore') private _service: ITemperatureStore) {}

    add = async (model: TemperatureDomainModel): Promise<any> => {
        return await this._service.add(model);
    }

    search = async (filter: TemperatureSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: TemperatureDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
