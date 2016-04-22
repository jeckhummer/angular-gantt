'use strict';
(function () {
    angular.module('dev.gantt.mocks').config(GanttBaselinesDataProviderServiceMockConfig);

    function GanttBaselinesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttBaselinesDataProviderService", GanttBaselinesDataProviderServiceMock);
    }

    function GanttBaselinesDataProviderServiceMock($timeout, GanttBaselinesTestData) {
        var _baselines = {};

        var service = {
            getBaselines: getBaselines,
            saveBaseline: saveBaseline,
            deleteBaseline: deleteBaseline
        };

        var _DELAY_ENABLED = true;
        //var _DELAY_EN ABLED = false;

        var _DELAYS = {
            getBaselines: 1 * 1000,
            saveBaseline: 2 * 1000,
            deleteBaseline: 2 * 1000
        };

        _init();
        return service;

        function _init(){
            _baselines = GanttBaselinesTestData.baselines;
        }

        function getBaselines(){
            var promise = _getPromise('getBaselines', function () {
                return _baselines;
            });
            return promise;
        }

        function saveBaseline(name, baseline){
            var promise = _getPromise('saveBaseline', function () {
                _baselines[name] = baseline;
            });
            return promise;
        }

        function deleteBaseline(name){
            var promise = _getPromise('deleteBaseline', function () {
                delete _baselines[name];
            });
            return promise;
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