import { DayData } from '../models/DayData';
import { DayOfMonth } from '../models/DayOfMonth';
import DateHelperService from './DateHelperService';
import RequestHelperService from './RequestHelperService';
import { COMMENTS } from '../data/comments'

export default class WorkTimeService {

    static async getWorkTimeToday() {
        return this.getWorkTimeByDay();
    }

    static async getWorkTimeByDay(date = null) {
        date = date != null ? (new DateHelperService(date)).defaultString() : null;
        let qString = date != null ? 'worktime_data_by_day?day=' + date : 'worktime_data_today';
        return await RequestHelperService.fetch(qString).then(r => {
            return {
                currentPeriodData: r.currentPeriodData,
                currentDayData: new DayData(r.currentDayData)
            }
        }).catch(e => { throw e });
    }

    static async getCommentsByDay(date = null) {
        return COMMENTS;
        //.then(d => d).catch(e => e);
        return Comments.COMMENTS;
        date = date != null ? (new DateHelperService(date)).defaultString() : null;
        let qString = date != null ? 'worktime_comments_by_day?day=' + date : 'worktime_data_today';
        return await RequestHelperService.fetch(qString).then(r => {
            return {
                currentPeriodData: r.currentPeriodData,
                currentDayData: new DayData(r.currentDayData)
            }
        }).catch(e => { throw e });
    }

    static async sendComment(comment) {
        return;
        return await RequestHelperService.fetch('settime', 'POST').then(r => r).catch(e => { throw e });
    }

    static async getMonthData(date = null) {
        date = date != null ? (new DateHelperService(date)) : null;
        let qString = date != null ? 'worktime_month?year=' + date.format('YYYY') + '&month=' + date.format('MM') : 'worktime_month';
        return await RequestHelperService.fetch(qString).then(r => r.data.map(obj => new DayOfMonth(obj))).catch(e => { throw e });
    }

    static async setTime() {
        return await RequestHelperService.fetch('settime', 'POST').then(r => r).catch(e => { throw e });
    }
}