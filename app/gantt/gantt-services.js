'use strict';
var gantt = angular.module('gantt');

gantt.service('_ganttDataProvider', [function () {
    this.get = function () {
        return ganttTestData;
    };
}]);

gantt.service('tasks', ['_ganttDataProvider', function (provider) {
    var self = this;
    var formatted_data = [];
    var overall_di;

    self.init = function () {
        var starts = [];
        var ends = [];

        provider.get().forEach(function (task) {
            var di = new DateInterval(
                moment(task.date.start, 'YYYY-MM-DD'),
                moment(task.date.end, 'YYYY-MM-DD')
            );

            starts.push(di.start);
            ends.push(di.end);

            var obj = {
                name: task.name,
                id: task.id,
                dateInterval: di,
                parent_id: task.parent_id,
                percent_complete: task.percent_complete,
            };

            formatted_data.push(obj);
        });

        overall_di = new DateInterval(moment.min(starts), moment.max(ends));
    };

    self.getDateInterval = function () {
        return overall_di;
    }

    self.getAll = function () {
        return formatted_data;
    }

    self.init();
}]);