function DateInterval(date1, date2) {
    this.start = date1;
    this.end = date2;
    this.days = this.end.diff(this.start, 'days') + 1;

    this.clone = function () {
        return new DateInterval(this.start, this.end);
    }

    this.toString = function () {
        return this.start.format('YYYY-MM-DD') + 
            ' - ' + this.end.format('YYYY-MM-DD') +
            '  |  ' + this.start.format() +
            ' - ' + this.end.format() + 
            '  |  ' + this.days + ' days';
    }

    this.isEqual = function(di){
        return this.start.diff(di.start) === 0 && this.end.diff(di.end) === 0;
    }
}

DateInterval.join = function (a, b) {
    var start, end;

    start = moment.min(a.start, b.start);
    end = moment.max(a.end, b.end);

    var res = new DateInterval(start, end);
    return res;
}

DateInterval.intersect = function (a, b) {
    var start, end;

    start = moment.max(a.start, b.start);
    end = moment.min(a.end, b.end);

    var res = new DateInterval(start, end);
    return res;
}