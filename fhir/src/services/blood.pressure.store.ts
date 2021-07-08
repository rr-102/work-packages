import 'reflect-metadata';
import { IBloodPressureStore } from '../interfaces/blood.pressure.store.interface';
import { injectable, inject } from "tsyringe";
import { BloodPressureDomainModel, BloodPressureSearchFilters } from '../types/domain.types/blood.pressure.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class BloodPressureStore {

    constructor(@inject('IBloodPressureStore') private _service: IBloodPressureStore) {}

    add = async (model: BloodPressureDomainModel): Promise<any> => {
        return await this._service.add(model);
    }

    search = async (filter: BloodPressureSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: BloodPressureDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
