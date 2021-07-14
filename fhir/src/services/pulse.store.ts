import 'reflect-metadata';
import { IPulseStore } from '../interfaces/pulse.store.interface';
import { injectable, inject } from "tsyringe";
import { PulseDomainModel, PulseSearchFilters } from '../types/domain.types/pulse.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class PulseStore {

    constructor(@inject('IPulseStore') private _service: IPulseStore) {}

    add = async (model: PulseDomainModel): Promise<any> => {
        return await this._service.add(model);
    }

    search = async (filter: PulseSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: PulseDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
