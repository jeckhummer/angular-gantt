angular.module('timeline').service('TimeLineGrid', function () {
    this.generate = function (type, _date_interval) {
        var date_interval = _date_interval.clone();

        //logOpenGroup("Grid line " + gridname + " calculating");
        //log("Overall date interval", date_interval.toString());

        var grid_items = [];
        var first_iteration = true;
        var boundaries, index, position;

        //logOpenGroup("Iterations");

        while (first_iteration || moment(date_interval.end).diff(boundaries.end) > 0) {
            //logOpenGroup();
            boundaries = first_iteration == true ?
                type.generate_first_boundaries(date_interval.start) :
                type.generate_next_boundaries(boundaries);

            //log('boundary', boundaries.toString());

            index = first_iteration ?
                type.generate_init_index(boundaries) :
                type.generate_index(boundaries, index);

            position = DateIntervalPosition(date_interval, boundaries);
            grid_items.push({
                index: index,
                label: type.render_label(index),
                date_interval: boundaries,
                width: position.width,
            });

            //log('index', index);
            //log('width - percent', position.width);
            //log('width - days', boundaries.days);
            //logCloseGroup();

            first_iteration = false;
        }

        //logCloseGroup();
        //logCloseGroup();

        return {grid: grid_items};
    }
});