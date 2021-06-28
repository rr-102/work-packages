
// import { DoctorDomainModel } from "../domain.types/doctor.domain.types";

import { Helper } from "../../common/helper";
import { AddressDomainModel } from "../domain.types/address.domain.types";
import { DoctorDomainModel } from "../domain.types/doctor.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class DoctorMapper {

    public static convertJsonObjectToDomainModel = () => {

        var doctorObj = Helper.readJsonResource('doctor.domain.model.json');

        var address: AddressDomainModel = {
            Type: doctorObj.Address.Type != null ? doctorObj.Address.Type.toLowerCase() : 'official',
            AddressLine: doctorObj.Address.AddressLine ?? '',
            City: doctorObj.Address.City ?? '',
            District: doctorObj.Address.District ?? '',
            State: doctorObj.Address.State ?? '',
            Country: doctorObj.Address.Country ?? '',
            PostalCode: doctorObj.Address.PostalCode ?? ''
        };

        var model: DoctorDomainModel = {
            FirstName: doctorObj.FirstName,
            //MiddleName: doctorObj.MiddleName, -- not sure if required
            LastName: doctorObj.LastName,
            //Suffix: doctorObj.Suffix,  --not sure if required
            Phone: doctorObj.Phone,
            Email: doctorObj.Email,
            Gender: doctorObj.Gender,
            BirthDate: doctorObj.BirthDate,
            Address: address
        }

        return model;
    }

    // static toDetailsDto = async (doctor: doctor): Promise<doctorDetailsDto> => {

    //     if(doctor == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(doctor.UserId);

    //     var addressRepo = new AddressRepo();
    //     const address = await addressRepo.getByUserId(user.id);

    //     var dto: doctorDetailsDto = {
    //         id: doctor.id,
    //         UserId: user.id,
    //         DisplayId: doctor.DisplayId,
    //         EhrId: doctor.EhrId,
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
    //         MedicalProfile: null, //doctorMedicalProfileDto;
    //         Insurances: [], //doctorInsuranceDto[];
    //         EmergencyContacts: [], // doctorEmergencyContactDto[];
    //     };
    //     return dto;
    // }

    // static toDto = async (doctor: doctor): Promise<doctorDto> => {

    //     if(doctor == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(doctor.UserId);

    //     var dto: doctorDto = {
    //         id: doctor.id,
    //         UserId: user.id,
    //         DisplayId: doctor.DisplayId,
    //         EhrId: doctor.EhrId,
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