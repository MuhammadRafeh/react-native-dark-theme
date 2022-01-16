import DateHelperService from "../services/DateHelperService";

export class DayOfMonth {
    constructor(data) {

        Object.assign(this, data);

        this.day = new DateHelperService(data.day);
        this.id = this.day.unix();
        this.is_valid = !!data.is_valid;
        this.is_negative = !!data.is_negative;
        this.has_vacation = !!data.has_vacation;
        this.has_public_holiday = !!data.has_public_holiday;
        this.no_data = !!data.no_data;
    }
}
