import 'reflect-metadata';
import { IPharmacyStore } from '../interfaces/pharmacy.store.interface';
import { injectable, inject } from "tsyringe";
import { PharmacyDomainModel, PharmacySearchFilters } from '../types/domain.types/pharmacy.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class PharmacyStore {

    constructor(@inject('IPharmacyStore') private _service: IPharmacyStore) {}

    create = async (model: PharmacyDomainModel): Promise<any> => {
        return await this._service.create(model);
    }

    search = async (filter: PharmacySearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: PharmacyDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
