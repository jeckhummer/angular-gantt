'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttResourcesDataProviderServiceMockConfig);

    function GanttResourcesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttResourcesDataProviderService", GanttResourcesDataProviderServiceMock);
    }
    function GanttResourcesDataProviderServiceMock(DelayedResponseFactoryService) {
        var data = [
            { id: 1, name: "Maxim Vasilyev", assignedToProjects: [1,3], assignedToTasks: [1,4], employmentPercentage: 90, employmentHours: 7},
            { id: 2, name: "Sattar Seyidov", assignedToProjects: [3,2,6], assignedToTasks: [2,6], employmentPercentage: 60, employmentHours: 5},
            { id: 3, name: "Ismail Musayev", assignedToProjects: [3,2,4], assignedToTasks: [2,4], employmentPercentage: 55, employmentHours: 7.5},
            { id: 4, name: "Teymur Ordukhanov", assignedToProjects: [1,3], assignedToTasks: [1,4], employmentPercentage: 30, employmentHours: 2.5},
            { id: 5, name: "Teymur Mustafayev", assignedToProjects: [1,4,5,6], assignedToTasks: [5,6], employmentPercentage: 95, employmentHours: 7.5},
            { id: 6, name: "Flek Dos", assignedToProjects: [2,3,4,5,6], assignedToTasks: [1,2,4,5,6], employmentPercentage: 100, employmentHours: 8}
        ];
        var config = new DelayedResponseConfig(3 * 1000, 0);

        return {
            getResources: DelayedResponseFactoryService.create(new DelayedResponse(data, 'error'), config),
            assignResourceToTask: DelayedResponseFactoryService.create(
                new DelayedResponse('ok','error'),
                new DelayedResponseConfig(3 * 1000, 0)
            ),
            unassignResourceFromTask: DelayedResponseFactoryService.create(
                new DelayedResponse('ok','error'),
                new DelayedResponseConfig(3 * 1000, 0)
            )
        };
    }
})();