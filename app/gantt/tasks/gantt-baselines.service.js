(function () {
    angular.module('gantt').factory('GanttBaselinesService', GanttBaselinesService);

    function GanttBaselinesService(GanttDataHTTPService, $rootScope, GanttTaskFactoryService) {
        var baselines = {};
        var currentBaseline = null;

        var service = {
            setCurrentBaseline: setCurrentBaseline,
            getTask: getTask,
            getCurrentBaseline: getCurrentBaseline,
            addBaseline: addBaseline
        };

        init();
        return service;

        function init(){
            GanttDataHTTPService.getBaselines()
                .then(addBaselines)
                .then(onBaselinesChanged)
                .then(()=>setCurrentBaseline('Saved Baseline 1'));
        }

        function addBaseline(name, baseline){
            baselines[name] = [];
            for(var i in baseline){
                var baselineTask = GanttTaskFactoryService.create(baseline[i]);
                baselines[name].push(baselineTask);
            }
        }

        function addBaselines(_baselines){
            for(var name in _baselines){
                addBaseline(name, _baselines[name]);
            }
        }

        function getTask(taskID){
            for(var i in currentBaseline){
                if(currentBaseline[i].id == taskID) return currentBaseline[i];
            }
        }

        function getCurrentBaseline(){
            return currentBaseline;
        }

        function setCurrentBaseline(baselineName){
            currentBaseline = baselines[baselineName];
            onCurrentBaselineChanged();
        }

        function onBaselinesChanged(){
            $rootScope.$broadcast('baselines-changed');
        }

        function onCurrentBaselineChanged(){
            $rootScope.$broadcast('current-baseline-changed', currentBaseline);
        }
    }
})();