import { DayComment } from "./DayComment";
import DateHelperService from "../services/DateHelperService";

// Klasse fuer alle Kommentare des Tages
export class DayComment {
    constructor(data) {
        Object.assign(this, data);
        this.id = data.id;
        this.day = new DateHelperService(data.day);
        this.comments = data.Comments.map( (comments) => new DayComment(comments)); // List of class DayComment
    }
}
