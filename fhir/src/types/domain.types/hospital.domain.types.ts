import { AddressDomainModel } from './address.domain.types';

export interface HospitalDomainModel {
    Type: string;
    Name: string;
    ContactPhone?: string;
    ContactEmail?: string;
    AboutUs?: string;
    OperationalSince?: string;
    Address?: AddressDomainModel;
}
