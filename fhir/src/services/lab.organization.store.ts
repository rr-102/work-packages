import 'reflect-metadata';
import { ILabOrganizationStore } from '../interfaces/lab.organization.store.interface';
import { injectable, inject } from "tsyringe";
import { LabOrganizationDomainModel, LabOrganizationSearchFilters } from '../types/domain.types/lab.organization.domain.types';

///////////////////////////////////////////////////////////////////

@injectable()
export class LabOrganizationStore {

    constructor(@inject('ILabOrganizationStore') private _service: ILabOrganizationStore) {}

    create = async (model: LabOrganizationDomainModel): Promise<any> => {
        return await this._service.create(model);
    }

    search = async (filter: LabOrganizationSearchFilters): Promise<any> => {
        return await this._service.search(filter);
    }

    getById = async (id: string): Promise<any> => {
        return await this._service.getById(id);
    }

    update = async (id: string, updates: LabOrganizationDomainModel): Promise<any> => {
        return await this._service.update(id, updates);
    }

    delete = async (id: string): Promise<any> => {
        return await this._service.delete(id);
    }

}
