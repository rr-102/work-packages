import { Gender } from '../../common/system.types';
import { AddressDomainModel } from './address.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

//#region Domain models

export interface PatientDomainModel {
    id?: string;
    UserId?: string;
    DisplayId?: string,
    EhrId?: string;
    NationalHealthId?:string;
    MedicalProfileId?: string;

    DisplayName?: string;
    FirstName?: string;
    MiddleName?: string;
    LastName?: string;
    Prefix?: string;
    Phone?: string;
    Email?: string;
    Gender?: Gender;
    BirthDate?: Date;
    ActiveSince?: Date;
    ImageResourceId?:string;
    DefaultTimeZone?:string;
    CurrentTimeZone?:string;
        
    InsuranceIds?: string[];
    EmergencyContactIds?: string[];

    Address?: AddressDomainModel;
};

//#endregion


//#region  Search filters

export interface PatientSearchFilters {
    Phone: string;
    Email: string;
    Name: string;
    Gender: Gender;
    BirthdateFrom: Date;
    BirthdateTo: Date;
    CreatedDateFrom: Date;
    CreatedDateTo: Date;
    OrderBy: string;
    Order: string;
    PageIndex: number;
    ItemsPerPage: number;
};

//#endregion
