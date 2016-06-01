'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttResourcesDataProviderServiceMockConfig);

    function GanttResourcesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttResourcesDataProviderService", GanttResourcesDataProviderServiceMock);
    }
    function GanttResourcesDataProviderServiceMock(DelayedResponseFactoryService) {
        var data = new DelayedResponse(
            [
                { id: 1, name: "Maxim Vasilyev", assignedToProjects: [1,3], employmentPercentage: 90, employmentHours: 7},
                { id: 2, name: "Sattar Seyidov", assignedToProjects: [2,6], employmentPercentage: 60, employmentHours: 5},
                { id: 3, name: "Ismail Musayev", assignedToProjects: [2,4], employmentPercentage: 55, employmentHours: 7.5},
                { id: 4, name: "Teymur Ordukhanov", assignedToProjects: [1,3], employmentPercentage: 30, employmentHours: 2.5},
                { id: 5, name: "Teymur Mustafayev", assignedToProjects: [5, 6], employmentPercentage: 95, employmentHours: 7.5},
                { id: 6, name: "Flek Dos", assignedToProjects: [1, 2, 3, 4, 5 ,6], employmentPercentage: 100, employmentHours: 8}
            ],
            'error!'
        );
        var options = new DelayedResponseConfig(2 * 1000, 0);

        return {
            getResources: DelayedResponseFactoryService.create(data, options)
        };
    }
})();