//#region Domain models

export interface BloodPressureDomainModel {
    id?: string;
    PatientUserId?: string;
    PatientEhirId?: string;
    VisitId?: string;
    VisitEhirId?: string;
    Unit?: string;
    RecordedBy?: string;
    RecordedByEhirId?: string;
    RecordDate?:Date;
    BloodPressureSystolic?: number;
    BloodPressureDiastolic?: number;
    };

//#endregion

export interface BloodPressureSearchFilters {
    PatientUserId: string,
    VisitId: string;
    RecordDate: string;
};