'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttOptionsDataProviderServiceMockConfig);

    function GanttOptionsDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttOptionsDataProviderService", GanttOptionsDataProviderServiceMock);
    }

    function GanttOptionsDataProviderServiceMock($q, GanttTimelineTestData, $timeout) {
        var service = {
            getTimelineConfig: getTimelineConfig,
            saveTimelineConfig: saveTimelineConfig
        };

        var _DELAY_ENABLED = true;
        var _DELAY_ENABLED = false;

        var _DELAYS = {
            getTimelineConfig: 2000
        };

        _init();
        return service;

        function _init() {

        }

        function getTimelineConfig() {
            var promise = _getPromise('getTimelineConfig', function () {
                return GanttTimelineTestData.timelineConfig;
            });
            return promise;
        }

        function saveTimelineConfig(){
            return $q.resolve();
        }

        function _getDelay(actionName) {
            return _DELAY_ENABLED ? _DELAYS[actionName] : 0;
        }

        function _getPromise(actionName, action) {
            var delay = _getDelay(actionName);
            return $timeout(action, delay);
        }
    }
})();