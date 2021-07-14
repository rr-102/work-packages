import { Helper } from "../../common/helper";
import { PulseDomainModel } from "../domain.types/pulse.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class PulseMapper {

    public static convertJsonObjectToDomainModel = () => {

        var pulseObj = Helper.readJsonResource('pulse.domain.model.json');

        var model: PulseDomainModel = {
            PatientUserId: pulseObj.PatientUserId,
            PatientEhrId: pulseObj.PatientEhrId, 
            VisitId: pulseObj.VisitId,
            VisitEhrId: pulseObj.VisitEhrId,
            Unit: pulseObj.Unit,
            RecordedBy: pulseObj.RecordedBy,
            RecordedByEhrId: pulseObj.RecordedByEhrId,
            RecordDate: pulseObj.RecordDate, 
        }

        return model;
    }

}