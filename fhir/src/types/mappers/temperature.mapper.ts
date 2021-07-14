import { Helper } from "../../common/helper";
import { TemperatureDomainModel } from "../domain.types/temperature.domain.types";

///////////////////////////////////////////////////////////////////////////////////

export class TemperatureMapper {

    public static convertJsonObjectToDomainModel = () => {

        var temperatureObj = Helper.readJsonResource('temperature.domain.model.json');

        var model: TemperatureDomainModel = {
            PatientUserId: temperatureObj.PatientUserId,
            PatientEhrId: temperatureObj.PatientEhrId, 
            VisitId: temperatureObj.VisitId,
            VisitEhrId: temperatureObj.VisitEhrId,
            Unit: temperatureObj.Unit,
            RecordedBy: temperatureObj.RecordedBy,
            RecordedByEhrId: temperatureObj.RecordedByEhrId,
            RecordDate: temperatureObj.RecordDate,
            Temperature: temperatureObj.Temperature, 
        }

        return model;
    }

}