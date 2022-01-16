import DateHelperService from "../services/DateHelperService";
import moment from 'moment';

// Klasse fuer ein Kommentar des Tages
export class DayComment {
    constructor(data) {
        moment.locale('de');
        Object.assign(this, data);
        this.id = data.id;
        this.author = data.author;
        this.time = data.time;
        this.comment = data.comment;
        this.status = data.status;
        this.timeReadable = data.timeReadable;
    }
}
