'use strict';
(function () {
    angular.module('timeline').factory('TimeLineGridService', TimeLineGridService);

    function TimeLineGridService() {
        var service = {
            generate: generate
        };
        return service;

        function generate(type, _date_interval) {
            var date_interval = _date_interval.clone();

            var grid = [];
            var first_iteration = true;
            var boundaries, index, position;

            while (first_iteration || moment(date_interval.end).diff(boundaries.end) > 0) {
                boundaries = first_iteration == true ?
                    type.generate_first_boundaries(date_interval.start) :
                    type.generate_next_boundaries(boundaries);

                index = first_iteration ?
                    type.generate_init_index(boundaries) :
                    type.generate_index(boundaries, index);

                position = DateIntervalPosition(date_interval, boundaries);
                grid.push({
                    index: index,
                    label: type.render_label(index),
                    date_interval: boundaries,
                    width: position.width,
                });

                first_iteration = false;
            }

            return grid;
        }
    }
})();

