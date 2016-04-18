'use strict';
(function () {
    angular.module('gantt').factory('GanttBaselinesDataProviderService', GanttBaselinesDataProviderService);

    function GanttBaselinesDataProviderService(GanttHttpService) {
        var service = {
            getBaselines: getBaselines,
            saveBaselines: saveBaselines
        };
        
        _init();
        return service;
        
        function _init(){
            
        }

        function getBaselines(){
            var promise = GanttHttpService.sendRequest('GetBaselines')
                .then(function (data) {
                    var baselines = {};
                    data.forEach(function (task) {
                        if (baselines[task.baseline] == undefined) {
                            baselines[task.baseline] = [];
                        }
                        baselines[task.baseline].push(task);
                    });
                    return baselines;
                });
            return promise;
        }

        function saveBaselines(name, tasks) {
            var data = {
                json: JSON.stringify({
                    baseline: name,
                    tasks: tasks
                })
            };

            var promise = GanttHttpService.sendRequest('SaveBaseline', data);
            return promise;
        }
    }
})();