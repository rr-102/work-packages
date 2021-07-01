import { DiagnosticLabUserDomainModel } from '../types/domain.types/diagnostic.lab.user.domain.types';

////////////////////////////////////////////////////////////////////////////////////

export interface IDiagnosticLabUserStore {
    search(filter: any): any;
    create(DiagnosticLabUserDomainModel: DiagnosticLabUserDomainModel): Promise<any>;
    getById(id: string): Promise<any>;
    update(id: string, updates: DiagnosticLabUserDomainModel): Promise<any>;
    delete(id: string): Promise<any>;
}
