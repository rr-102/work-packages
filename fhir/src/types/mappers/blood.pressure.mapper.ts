import { Helper } from "../../common/helper";
import { BloodPressureDomainModel } from "../domain.types/blood.pressure.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class BloodPressureMapper {

    public static convertJsonObjectToDomainModel = () => {

        var bloodPressureObj = Helper.readJsonResource('blood.pressure.domain.model.json');

        var model: BloodPressureDomainModel = {
            PatientUserId: bloodPressureObj.PatientUserId,
            PatientEhirId: bloodPressureObj.PatientEhirId, 
            VisitId: bloodPressureObj.VisitId,
            VisitEhirId: bloodPressureObj.VisitEhirId,
            Unit: bloodPressureObj.Unit,
            RecordedBy: bloodPressureObj.RecordedBy,
            RecordedByEhirId: bloodPressureObj.RecordedByEhirId,
            RecordDate: bloodPressureObj.RecordDate, 
            BloodPressureSystolic: bloodPressureObj.BloodPressureSystolic,
            BloodPressureDiastolic: bloodPressureObj.BloodPressureDiastolic,
        }

        return model;
    }

}