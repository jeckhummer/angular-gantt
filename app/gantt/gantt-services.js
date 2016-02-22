'use strict';
(function () {
    angular.module('gantt').factory('GanttDataProvider', GanttDataProvider);

    function GanttDataProvider() {
        var service = {
            get: get
        };
        return service;

        function get(){
            return ganttTestData;
        }
    }
})();

(function () {
    angular.module('gantt').factory('tasks', TasksService);

    function TasksService (GanttDataProvider) {
        var formatted_data = [];
        var overall_di;

        var service = {
            init: init,
            getDateInterval: getDateInterval,
            getAll: getAll
        };
        service.init();
        return service;


        function init() {
            var starts = [];
            var ends = [];

            GanttDataProvider.get().forEach(function (task) {
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

        function getDateInterval() {
            return overall_di;
        }

        function getAll() {
            return formatted_data;
        }
    }
})();
