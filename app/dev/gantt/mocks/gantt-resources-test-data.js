'use strict';

(function () {
    angular.module('dev.gantt.mocks').value('GanttResourcesTestData', getGanttResourcesTestData());
    function getGanttResourcesTestData() {
        var resources = [
            {
                id: 1,
                name: "Maxim Vasilyev",
                projects: [
                    "Smart Gantt",
                    "BP Photo Album Support"
                ],
                employmentPercentage: 90,
                employmentHours: 7
            },
            {
                id: 2,
                name: "Sattar Seyidov",
                projects: [
                    "Bakcell ITAM",
                    "BP Support"
                ],
                employmentPercentage: 60,
                employmentHours: 5
            },
            {
                id: 3,
                name: "Ismail Musayev",
                projects: [
                    "SS Liberty",
                    "Bakcell PPM"
                ],
                employmentPercentage: 55,
                employmentHours: 7.5
            },
            {
                id: 4,
                name: "Teymur Ordukhanov",
                projects: ["Smart Gantt"],
                employmentPercentage: 30,
                employmentHours: 2.5
            },
            {
                id: 4,
                name: "Teymur Mustafayev",
                projects: ["Express Bank Support"],
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