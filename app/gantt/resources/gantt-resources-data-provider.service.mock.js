'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttResourcesDataProviderServiceMockConfig);

    function GanttResourcesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttResourcesDataProviderService", GanttResourcesDataProviderServiceMock);
    }

    function GanttResourcesDataProviderServiceMock(DelayedResponseFactoryService) {
        var data = [
            {
                "id": 1,
                "name": "Maxim Vasilyev",
                "assignedToProjects": [1, 3],
                "assignedToTasks": [
                    {"id": 1, "hours": 5},
                    {"id": 4, "hours": 4}
                ]
            }, {
                "id": 2,
                "name": "Sattar Seyidov",
                "assignedToProjects": [3, 2, 6],
                "assignedToTasks": [
                    {"id": 2, "hours": 3},
                    {"id": 6, "hours": 2}
                ]
            }, {
                "id": 3,
                "name": "Ismail Musayev",
                "assignedToProjects": [3, 2, 4],
                "assignedToTasks": [
                    {"id": 2, "hours": 6},
                    {"id": 4, "hours": 8}
                ]
            }, {
                "id": 4,
                "name": "Teymur Ordukhanov",
                "assignedToProjects": [1, 3],
                "assignedToTasks": [
                    {"id": 1, "hours": 1},
                    {"id": 4, "hours": 4}
                ]
            }, {
                "id": 5,
                "name": "Teymur Mustafayev",
                "assignedToProjects": [1, 4, 5, 6],
                "assignedToTasks": [
                    {"id": 5, "hours": 4},
                    {"id": 6, "hours": 7}
                ]
            }, {
                "id": 6,
                "name": "Flek Dos",
                "assignedToProjects": [2, 3, 4, 5, 6],
                "assignedToTasks": [
                    {"id": 1, "hours": 3},
                    {"id": 2, "hours": 3},
                    {"id": 4, "hours": 5},
                    {"id": 5, "hours": 5},
                    {"id": 6, "hours": 2}
                ]
            }
        ];
        var config = new DelayedResponseConfig(3 * 1000, 0);

        return {
            getResources: DelayedResponseFactoryService.create(new DelayedResponse(data, 'error'), config),
            assignResourceToTask: DelayedResponseFactoryService.create(
                new DelayedResponse('ok', 'error'),
                new DelayedResponseConfig(3 * 1000, 0)
            ),
            unassignResourceFromTask: DelayedResponseFactoryService.create(
                new DelayedResponse('ok', 'error'),
                new DelayedResponseConfig(3 * 1000, 0)
            )
        };
    }
})();