import moment from "moment";
import tz from "moment-timezone"

export default class DateHelperService {

    momentObj = null;

    weekDayMapShort = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    weekDayMapLong = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

    constructor(date) {
        moment.locale('de');
        this.momentObj = moment.tz(date,"Europe/Vienna");
    }

    format(format) {
        return this.momentObj.format(format);
    }
    unix() {
        return this.momentObj.unix();
    }
    readable() {
        return this.momentObj.format('DD.MM.YYYY');
    }
    defaultString() {
        return this.momentObj.format('YYYY-MM-DD');
    }

    weekday(long = false) {
        return !long ? this.weekDayMapShort[this.momentObj.format('d')] : this.weekDayMapLong[this.momentObj.format('d')]
    }
}
