import 'reflect-metadata';
import { IHospitalStore } from '../interfaces/hospital.store.interface';
import { injectable, inject } from "tsyringe";
import { HospitalDomainModel, HospitalSearchFilters } from '../types/domain.types/hospital.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class HospitalStore {

    constructor(@inject('IHospitalStore') private _service: IHospitalStore) {}

    create = async (model: HospitalDomainModel): Promise<any> => {
        return await this._service.create(model);
    }

    search = async (filter: HospitalSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: HospitalDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
