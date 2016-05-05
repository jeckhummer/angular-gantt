'use strict';

(function () {
    angular.module('dev.gantt.mocks').value('GanttResourcesTestData', getGanttResourcesTestData());
    function getGanttResourcesTestData() {
        var resources = [
            {
                id: 1,
                name: "Maxim Vasilyev",
                assignedToProjects: [1,3],
                employmentPercentage: 90,
                employmentHours: 7
            },
            {
                id: 2,
                name: "Sattar Seyidov",
                assignedToProjects: [2,6],
                employmentPercentage: 60,
                employmentHours: 5
            },
            {
                id: 3,
                name: "Ismail Musayev",
                assignedToProjects: [2,4],
                employmentPercentage: 55,
                employmentHours: 7.5
            },
            {
                id: 4,
                name: "Teymur Ordukhanov",
                assignedToProjects: [1,3],
                employmentPercentage: 30,
                employmentHours: 2.5
            },
            {
                id: 5,
                name: "Teymur Mustafayev",
                assignedToProjects: [5, 6],
                employmentPercentage: 95,
                employmentHours: 7.5
            }
        ];

        var mock = {
            resources: resources
            //saveResponse: saveResponse
        };
        return mock;
    }
})();