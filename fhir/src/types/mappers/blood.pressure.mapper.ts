import { Helper } from "../../common/helper";
import { BloodPressureDomainModel } from "../domain.types/blood.pressure.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class BloodPressureMapper {

    public static convertJsonObjectToDomainModel = () => {

        var bloodPressureObj = Helper.readJsonResource('blood.pressure.domain.model.json');

        var model: BloodPressureDomainModel = {
            PatientId: bloodPressureObj.PatientId,
            Unit: bloodPressureObj.Unit,
            VisitId: bloodPressureObj.VisitId,
            RecordDate: bloodPressureObj.RecordDate,
            RecordedBy: bloodPressureObj.RecordedBy,
            BloodPressureSystolic: bloodPressureObj.BloodPressureSystolic,
            BloodPressureDiastolic: bloodPressureObj.BloodPressureDiastolic,
        }

        return model;
    }
    
}