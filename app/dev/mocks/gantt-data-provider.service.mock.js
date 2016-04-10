(function () {
    angular.module('app-dev').config(GanttDataProviderServiceMockConfig);

    function GanttDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttDataProviderService", GanttDataProviderServiceMock);
    }

    function GanttDataProviderServiceMock($q, HttpService, GanttTasksMock, GanttTimelineMock, GanttBaselinesMock, $timeout) {
        var service = {
            getTasks: getTasks,
            getConfig: getConfig,
            saveConfig: saveConfig,
            saveTask: saveTask,
            getBaselines: getBaselines,
            saveBaseline: saveBaseline
        };

        var _tasks = [];

        var _DELAY_ENABLED = true;
        //var _DELAY_ENABLED = false;

        var _DELAYS = {
            getTask: 1000,
            saveTask: 2000,
            deleteTask: 2000,
            getConfig: 2000,
            saveConfig: 2000,
            getBaselines: 2000,
            saveBaselines: 2000
        };

        init();
        return service;

        function _getDelay(actionName){
            return _DELAY_ENABLED ? _DELAYS[actionName] : 0;
        }

        function _getPromise(actionName, action){
            var delay = _getDelay(actionName);
            return $timeout(action, delay);
        }

        function init(){
        }

        function getTasks(){
            var promise = _getPromise('getTask', function () {
                return GanttTasksMock.tasks;
            });
            return promise;
        }

        function saveTask(task){
            console.log('saving gantt task: ', task);
            var promise = _getPromise('saveTask', function () {
                var index = searchTaskByID(task.id);
                GanttTasksMock.tasks[index] = task;
                return GanttTasksMock.saveResponse.success;
            });

            function searchTaskByID(id) {
                var index;
                for (var i in _tasks) {
                    if (_tasks[i].id == id) {
                        index = i;
                        break;
                    }
                }
                return index;
            }

            return promise;
        }

        function getConfig(){
            return HttpService.getResource('gantt-timeline-options', 0);
        }

        function saveConfig(config){
            console.log('saving gantt timeline config: ', config);
            return HttpService.postResource('gantt-timeline-options', config, 0);
        }

        function getBaselines(){
            var baselines = HttpService.getResource('gantt-baselines', 0);
            return baselines;
        }

        function saveBaseline(){
            return baselines;
        }
    }
}());