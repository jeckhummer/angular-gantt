'use strict';

(function () {
    angular.module('dev.gantt.mocks').value('GanttProjectsTestData', getGanttProjectsTestData());
    function getGanttProjectsTestData() {
        var projects = [
            {id: 1, name: "Bakcell ITAM"},
            {id: 2, name: "BP Support"},
            {id: 3, name: "Smart Gantt"},
            {id: 4, name: "BP Photo Album Support"},
            {id: 5, name: "SS Liberty"},
            {id: 6, name: "Express Bank Support"}
        ];

        var mock = {
            projects: projects
            //saveResponse: saveResponse
        };
        return mock;
    }
})();