'use strict';
(function () {
    angular.module('app-dev').config(GanttConfigDataProviderServiceMockConfig);

    function GanttConfigDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttConfigDataProviderService", GanttConfigDataProviderServiceMock);
    }

    function GanttConfigDataProviderServiceMock($q, GanttTimelineTestData) {
        var service = {
            getTimelineConfig: getTimelineConfig,
            saveTimelineConfig: saveTimelineConfig
        };

        _init();
        return service;

        function _init() {

        }

        function getTimelineConfig() {
            return $q.resolve(GanttTimelineTestData.timelineConfig);
        }

        function saveTimelineConfig(){
            return $q.resolve();
        }
    }
})();