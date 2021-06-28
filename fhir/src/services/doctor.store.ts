import 'reflect-metadata';
import { IDoctorStore } from '../interfaces/doctor.store.interface';
import { injectable, inject } from "tsyringe";
import { DoctorDomainModel, DoctorSearchFilters } from '../types/domain.types/doctor.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class PatientStore {

    constructor(@inject('IDoctorStore') private _service: IDoctorStore) {}

    create = async (model: DoctorDomainModel): Promise<any> => {
        return await this._service.create(model);
    }

    search = async (filter: DoctorSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: DoctorDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}