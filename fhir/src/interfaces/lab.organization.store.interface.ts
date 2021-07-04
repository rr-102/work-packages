import { LabOrganizationDomainModel, LabOrganizationSearchFilters } from '../types/domain.types/lab.organization.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface ILabOrganizationStore {
    create(patientDomainModel: LabOrganizationDomainModel): Promise<any>;
    search(filter: LabOrganizationSearchFilters): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: LabOrganizationDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
