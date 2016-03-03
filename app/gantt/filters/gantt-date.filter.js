'use strict';
(function () {
    angular.module('gantt').filter('ganttDate', GanttDateFilter);

    function GanttDateFilter(DateService) {
        return (dateStr)=> {
            return DateService.format(dateStr)
        };
    }
})();

