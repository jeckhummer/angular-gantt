function DateIntervalPosition(overall_date_interval, date_interval, overflow) {
    //logOpenGroup('DateIntervalPosition');
    //log('overall interval:', overall_date_interval.toString());
    
    overflow = !!overflow;
    var _date_interval = overflow ?
        date_interval :
        DateInterval.intersect(overall_date_interval, date_interval);
        
    //log('date interval original:', date_interval.toString());
    //log('date interval intersect:', _date_interval.toString());

    var result = {
        width: _date_interval.days / overall_date_interval.days * 100,
        left: (_date_interval.start.diff(overall_date_interval.start, 'days')) /
        overall_date_interval.days * 100
    };
    //log('width:', result.width, '%');
    //log('left:', result.left, '%');
    
    //logCloseGroup();
    return result;
}