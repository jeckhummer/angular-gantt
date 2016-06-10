'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttProjectsDataProviderServiceMockConfig);

    function GanttProjectsDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttProjectsDataProviderService", GanttProjectsDataProviderServiceMock);
    }
    function GanttProjectsDataProviderServiceMock(DelayedResponseFactoryService) {
        var data = new DelayedResponse(
            [
                {id: 1, name: "Bakcell ITAM"},
                {id: 2, name: "BP Support"},
                {id: 3, name: "Smart Gantt"},
                {id: 4, name: "BP Photo Album Support"},
                {id: 5, name: "SS Liberty"},
                {id: 6, name: "Express Bank Support"}
            ],
            'error!'
        );
        var options = new DelayedResponseConfig(0 * 1000, 0);

        return {
            getProjects: DelayedResponseFactoryService.create(data, options)
        };
    }
})();