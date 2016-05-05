'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttProjectsDataProviderServiceMockConfig);

    function GanttProjectsDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttProjectsDataProviderService", GanttProjectsDataProviderServiceMock);
    }
    function GanttProjectsDataProviderServiceMock(DelayWrapperFactoryService, GanttProjectsTestData) {
        var delayDisabled = false;
        // var delayDisabled = true;

        var service = {
            getProjects: DelayWrapperFactoryService.create(_getProjects, 2000, delayDisabled)
        };

        return service;

        function _getProjects() {
            return GanttProjectsTestData;
        }
    }
})();