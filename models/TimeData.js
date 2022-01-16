// Klasse fuer die Kommen/Gehen Zeitdaten
export class TimeData {
    constructor(data) {
        Object.assign(this, data);
        this.id = data.id;
        this.time = data.time;
        this.type = data.type;
        this.timeReadable = data.timeReadable;
    }
}
