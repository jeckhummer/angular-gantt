function DateIntervalPosition(overall_date_interval, date_interval, overflow) {
    overflow = !!overflow;
    var _date_interval = overflow ?
        date_interval :
        DateInterval.intersect(overall_date_interval, date_interval);

    var result = {
        width: _date_interval.days / overall_date_interval.days * 100,
        left: (_date_interval.start.diff(overall_date_interval.start, 'days')) /
        overall_date_interval.days * 100
    };

    return result;
}