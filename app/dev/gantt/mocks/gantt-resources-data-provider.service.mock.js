'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttResourcesDataProviderServiceMockConfig);

    function GanttResourcesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttResourcesDataProviderService", GanttResourcesDataProviderServiceMock);
    }
    function GanttResourcesDataProviderServiceMock(DelayWrapperFactoryService, GanttResourcesTestData) {
        var delayDisabled = false;
        // var delayDisabled = true;

        var service = {
            getResources: DelayWrapperFactoryService.create(_getResources, 4000, delayDisabled)
        };

        return service;

        function _getResources() {
            return GanttResourcesTestData.resources;
        }
    }
})();