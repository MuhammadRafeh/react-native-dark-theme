import { TimeData } from "./TimeData";
import DateHelperService from "../services/DateHelperService";

// Klasse fuer die Tagesdaten
export class DayData {
    constructor(data) {
        Object.assign(this, data);
        this.id = data.id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.day = new DateHelperService(data.day);
        this.soll = data.soll;
        this.ist = data.ist;
        this.diff = data.diff;
        this.vacation = data.vacation;
        this.has_vacation = data.has_vacation;
        this.has_doc = data.has_doc;
        this.is_negative = data.is_negative;
        this.is_valid = data.is_valid;
        this.has_public_holiday = data.has_public_holiday;
        this.has_vacation_all = data.has_vacation_all;
        this.no_data = data.no_data;
        this.user_id = data.user_id;
        this.sollReadable = data.sollReadable;
        this.istReadable = data.istReadable;
        this.diffReadable = data.diffReadable;
        this.timesData = data.timesData.map( (timeData) => new TimeData(timeData)); // List of class TimeData
    }
}
