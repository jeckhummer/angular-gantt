(function () {
    angular.module('gantt').factory('GanttBaselinesService', GanttBaselinesService);

    function GanttBaselinesService(GanttBaselinesDataProviderService, $rootScope,
                                   GanttTaskFactoryService, NotificationService) {
        var baselines = {};
        var currentBaselineName = null;

        var service = {
            toggleCurrentBaseline: toggleCurrentBaseline,
            getTask: getTask,
            getCurrentBaseline: getCurrentBaseline,
            getBaselineNames: getBaselineNames,
            addBaseline: addBaseline,
            deleteBaseline: deleteBaseline,
            getCurrentBaselineName: getCurrentBaselineName,
            isCurrentBaseline: isCurrentBaseline
        };

        init();
        return service;

        function init(){
            var suppressOK = true;
            var promise = GanttBaselinesDataProviderService.getBaselines().then(_initBaselines);
            NotificationService.notify('Loading baselines', promise, suppressOK);
        }

        function _initBaseline(name, baseline) {
            baselines[name] = [];
            for (var i in baseline) {
                var baselineTask = GanttTaskFactoryService.create(baseline[i]);
                baselines[name].push(baselineTask);
            }
            onBaselinesChanged();
        }

        function _initBaselines(baselines) {
            for(var name in baselines){
                _initBaseline(name, baselines[name]);
            }
        }

        function addBaseline(name, baseline){
            var promise = GanttBaselinesDataProviderService.saveBaseline(name, baseline)
                .then(function () {
                    _initBaseline(name, baseline);
                });
            return promise;
        }

        function deleteBaseline(name){
            var promise = GanttBaselinesDataProviderService.deleteBaseline(name)
                .then(function () {
                    delete baselines[name];
                    onBaselinesChanged();
                });
            return promise;
        }

        function getTask(taskID){
            var currentBaseline = getCurrentBaseline();
            for(var i in currentBaseline){
                if(currentBaseline[i].id == taskID) return currentBaseline[i];
            }
        }

        function getCurrentBaseline(){
            return baselines[currentBaselineName];
        }

        function getCurrentBaselineName(){
            return currentBaselineName;
        }

        function isCurrentBaseline(name){
            return currentBaselineName == name;
        }

        function getBaselineNames(){
            var names = [];
            angular.forEach(baselines, function (_, name) {
                names.push(name);
            });
            return names;
        }

        function toggleCurrentBaseline(name){
            currentBaselineName = currentBaselineName == name ? null : name;
            onCurrentBaselineChanged();
        }

        function onBaselinesChanged(){
            $rootScope.$broadcast('baselines-changed');
        }

        function onCurrentBaselineChanged(){
            $rootScope.$broadcast('current-baseline-changed');
        }
    }
})();