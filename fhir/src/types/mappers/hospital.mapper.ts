
// import { HospitalDomainModel } from "../domain.types/hospital.domain.types";

import { Helper } from "../../common/helper";
import { AddressDomainModel } from "../domain.types/address.domain.types";
import { HospitalDomainModel } from "../domain.types/hospital.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class HospitalMapper {

    public static convertJsonObjectToDomainModel = () => {

        var hospitalObj = Helper.readJsonResource('hospital.domain.model.json');

        var address: AddressDomainModel = {
            Type: hospitalObj.Address.Type != null ? hospitalObj.Address.Type.toLowerCase() : 'official',
            AddressLine: hospitalObj.Address.AddressLine ?? '',
            City: hospitalObj.Address.City ?? '',
            District: hospitalObj.Address.District ?? '',
            State: hospitalObj.Address.State ?? '',
            Country: hospitalObj.Address.Country ?? '',
            PostalCode: hospitalObj.Address.PostalCode ?? ''
        };

        var model: HospitalDomainModel = {
            Prefix: hospitalObj.Prefix,
            FirstName: hospitalObj.FirstName,
            MiddleName: hospitalObj.MiddleName,
            LastName: hospitalObj.LastName,
            Phone: hospitalObj.Phone,
            Email: hospitalObj.Email,
            Gender: hospitalObj.Gender,
            BirthDate: hospitalObj.BirthDate,
            Address: address
        }

        return model;
    }

    // static toDetailsDto = async (hospital: hospital): Promise<hospitalDetailsDto> => {

    //     if(hospital == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(hospital.UserId);

    //     var addressRepo = new AddressRepo();
    //     const address = await addressRepo.getByUserId(user.id);

    //     var dto: hospitalDetailsDto = {
    //         id: hospital.id,
    //         UserId: user.id,
    //         DisplayId: hospital.DisplayId,
    //         EhrId: hospital.EhrId,
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
    //         MedicalProfile: null, //hospitalMedicalProfileDto;
    //         Insurances: [], //hospitalInsuranceDto[];
    //         EmergencyContacts: [], // hospitalEmergencyContactDto[];
    //     };
    //     return dto;
    // }

    // static toDto = async (hospital: hospital): Promise<hospitalDto> => {

    //     if(hospital == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(hospital.UserId);

    //     var dto: hospitalDto = {
    //         id: hospital.id,
    //         UserId: user.id,
    //         DisplayId: hospital.DisplayId,
    //         EhrId: hospital.EhrId,
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