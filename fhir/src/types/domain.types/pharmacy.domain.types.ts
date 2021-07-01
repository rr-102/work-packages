import { AddressDomainModel } from './address.domain.types';

export interface PharmacyDomainModel {
    Type: string;
    Name: string;
    ContactPhone?: string;
    ContactEmail?: string;
    AboutUs?: string;
    OperationalSince?: string;
    Address?: AddressDomainModel;
}

export interface PharmacySearchFilters {

};
