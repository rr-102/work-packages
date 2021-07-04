// import { PatientDomainModel } from "../domain.types/patient.domain.types";

import { Helper } from "../../common/helper";
import { AddressDomainModel } from "../domain.types/address.domain.types";
import { LabOrganizationDomainModel } from "../domain.types/lab.organization.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class LabOrganizationMapper {

    public static convertJsonObjectToDomainModel = () => {

        var LabOrganizationObj = Helper.readJsonResource('lab.organization.domain.model.json');

        var address: AddressDomainModel = {
            Type: LabOrganizationObj.Address.Type != null ? LabOrganizationObj.Address.Type.toLowerCase() : 'official',
            AddressLine: LabOrganizationObj.Address.AddressLine ?? '',
            City: LabOrganizationObj.Address.City ?? '',
            District: LabOrganizationObj.Address.District ?? '',
            State: LabOrganizationObj.Address.State ?? '',
            Country: LabOrganizationObj.Address.Country ?? '',
            PostalCode: LabOrganizationObj.Address.PostalCode ?? ''
        };

        var model: LabOrganizationDomainModel = {
            Prefix: LabOrganizationObj.Prefix,
            FirstName: LabOrganizationObj.FirstName,
            MiddleName: LabOrganizationObj.MiddleName,
            LastName: LabOrganizationObj.LastName,
            Phone: LabOrganizationObj.Phone,
            Email: LabOrganizationObj.Email,
            Gender: LabOrganizationObj.Gender,
            BirthDate: LabOrganizationObj.BirthDate,
            Address: address
        }

        return model;
    }

    // static toDetailsDto = async (patient: Patient): Promise<PatientDetailsDto> => {

    //     if(patient == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(patient.UserId);

    //     var addressRepo = new AddressRepo();
    //     const address = await addressRepo.getByUserId(user.id);

    //     var dto: PatientDetailsDto = {
    //         id: patient.id,
    //         UserId: user.id,
    //         DisplayId: patient.DisplayId,
    //         EhrId: patient.EhrId,
    //         UserName: user.UserName,
    //         Prefix: user.Prefix,
    //         FirstName: user.FirstName,
    //         MiddleName: user.MiddleName,
    //         LastName: user.LastName,
    //         DisplayName: user.DisplayName,
    //         Gender: user.Gender,
    //         BirthDate: user.BirthDate,
    //         Age: user.Age,
    //         Phone: user.Phone,
    //         Email: user.Email,
    //         ImageResourceId: user.ImageResourceId,
    //         ActiveSince: user.ActiveSince,
    //         IsActive: user.IsActive,
    //         LastLogin: user.LastLogin,
    //         DefaultTimeZone: user.DefaultTimeZone,
    //         CurrentTimeZone: user.CurrentTimeZone,
    //         Address: address,
    //         MedicalProfile: null, //PatientMedicalProfileDto;
    //         Insurances: [], //PatientInsuranceDto[];
    //         EmergencyContacts: [], // PatientEmergencyContactDto[];
    //     };
    //     return dto;
    // }

    // static toDto = async (patient: Patient): Promise<PatientDto> => {

    //     if(patient == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(patient.UserId);

    //     var dto: PatientDto = {
    //         id: patient.id,
    //         UserId: user.id,
    //         DisplayId: patient.DisplayId,
    //         EhrId: patient.EhrId,
    //         DisplayName: user.DisplayName,
    //         UserName: user.UserName,
    //         Phone: user.Phone,
    //         Email: user.Email,
    //         Gender: user.Gender,
    //         BirthDate: user.BirthDate,
    //         Age: user.Age,
    //     };
    //     return dto; 
    // }
}