import 'reflect-metadata';
import { IPharmacistStore } from '../interfaces/pharmacist.store.interface';
import { injectable, inject } from "tsyringe";
import { PharmacistDomainModel, PharmacistSearchFilters } from '../types/domain.types/pharmacist.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class PharmacistStore {

    constructor(@inject('IPharmacistStore') private _service: IPharmacistStore) {}

    create = async (model: PharmacistDomainModel): Promise<any> => {
        return await this._service.create(model);
    }

    search = async (filter: PharmacistSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: PharmacistDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}