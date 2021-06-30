
// import { PharmacyDomainModel } from "../domain.types/pharmacy.domain.types";

import { Helper } from "../../common/helper";
import { AddressDomainModel } from "../domain.types/address.domain.types";
import { PharmacyDomainModel } from "../domain.types/pharmacy.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class PharmacyMapper {

    public static convertJsonObjectToDomainModel = () => {

        var pharmacyObj = Helper.readJsonResource('pharmacy.domain.model.json');

        var address: AddressDomainModel = {
            Type: pharmacyObj.Address.Type != null ? pharmacyObj.Address.Type.toLowerCase() : 'official',
            AddressLine: pharmacyObj.Address.AddressLine ?? '',
            City: pharmacyObj.Address.City ?? '',
            District: pharmacyObj.Address.District ?? '',
            State: pharmacyObj.Address.State ?? '',
            Country: pharmacyObj.Address.Country ?? '',
            PostalCode: pharmacyObj.Address.PostalCode ?? ''
        };

        var model: PharmacyDomainModel = {
            Prefix: pharmacyObj.Prefix,
            FirstName: pharmacyObj.FirstName,
            MiddleName: pharmacyObj.MiddleName,
            LastName: pharmacyObj.LastName,
            Phone: pharmacyObj.Phone,
            Email: pharmacyObj.Email,
            Gender: pharmacyObj.Gender,
            BirthDate: pharmacyObj.BirthDate,
            Address: address
        }

        return model;
    }

    // static toDetailsDto = async (pharmacy: Pharmacy): Promise<PharmacyDetailsDto> => {

    //     if(pharmacy == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(pharmacy.UserId);

    //     var addressRepo = new AddressRepo();
    //     const address = await addressRepo.getByUserId(user.id);

    //     var dto: PharmacyDetailsDto = {
    //         id: pharmacy.id,
    //         UserId: user.id,
    //         DisplayId: pharmacy.DisplayId,
    //         EhrId: pharmacy.EhrId,
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
    //         MedicalProfile: null, //PharmacyMedicalProfileDto;
    //         Insurances: [], //PharmacyInsuranceDto[];
    //         EmergencyContacts: [], // PharmacyEmergencyContactDto[];
    //     };
    //     return dto;
    // }

    // static toDto = async (pharmacy: Pharmacy): Promise<PharmacyDto> => {

    //     if(pharmacy == null){
    //         return null;
    //     }

    //     var userRepo = new UserRepo();
    //     const user = await userRepo.getById(pharmacy.UserId);

    //     var dto: PharmacyDto = {
    //         id: pharmacy.id,
    //         UserId: user.id,
    //         DisplayId: pharmacy.DisplayId,
    //         EhrId: pharmacy.EhrId,
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