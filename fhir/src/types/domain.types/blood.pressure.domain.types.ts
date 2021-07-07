//#region Domain models

export interface BloodPressureDomainModel {
    id?: string;
    PatientId?: string;
    UserId?: string;
    VisitId?: string;
    Unit?: string;
    RecordedBy?: string;
    RecordDate?:Date;
    BloodPressureSystolic?: Number;
    BloodPressureDiastolic?: Number;

};

//#endregion

export interface BloodPressureSearchFilters {
    PatientId: string,
    VisitId: string;
    RecordDate: string;
};