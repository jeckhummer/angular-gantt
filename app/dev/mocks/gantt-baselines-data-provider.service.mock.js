'use strict';
(function () {
    angular.module('app-dev').config(GanttBaselinesDataProviderServiceMockConfig);

    function GanttBaselinesDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttBaselinesDataProviderService", GanttBaselinesDataProviderServiceMock);
    }

    function GanttBaselinesDataProviderServiceMock($q, GanttBaselinesTestData) {
        var service = {
            getBaselines: getBaselines
        };

        _init();
        return service;

        function _init(){

        }

        function getBaselines(){
            return $q.resolve(GanttBaselinesTestData.baselines);
        }
    }
})();