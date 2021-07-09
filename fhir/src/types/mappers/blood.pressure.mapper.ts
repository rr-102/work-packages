import { Helper } from "../../common/helper";
import { BloodPressureDomainModel } from "../domain.types/blood.pressure.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class BloodPressureMapper {

    public static convertJsonObjectToDomainModel = () => {

        var bloodPressureObj = Helper.readJsonResource('blood.pressure.domain.model.json');

        var model: BloodPressureDomainModel = {
            PatientUserId: bloodPressureObj.PatientUserId,
            PatientEhrId: bloodPressureObj.PatientEhrId, 
            VisitId: bloodPressureObj.VisitId,
            VisitEhrId: bloodPressureObj.VisitEhrId,
            Unit: bloodPressureObj.Unit,
            RecordedBy: bloodPressureObj.RecordedBy,
            RecordedByEhrId: bloodPressureObj.RecordedByEhrId,
            RecordDate: bloodPressureObj.RecordDate, 
            BloodPressureSystolic: bloodPressureObj.BloodPressureSystolic,
            BloodPressureDiastolic: bloodPressureObj.BloodPressureDiastolic,
        }

        return model;
    }

}