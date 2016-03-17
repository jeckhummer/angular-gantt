(function(){
    angular.module('gantt').controller('GanttBaselinesController', GanttBaselinesController);

    function GanttBaselinesController (GanttBaselinesService, GanttTasksService, $scope) {
        var ctrl = this;
        ctrl.toggleBaseline = toggleBaseline;
        ctrl.isCurrentBaseline = isCurrentBaseline;
        ctrl.addBaseline = addBaseline;
        ctrl.deleteBaseline = deleteBaseline;
        ctrl.name = '';

        init();

        function init(){
            $scope.$on('baselines-changed', initNames);
        }

        function initNames(){
            ctrl.baselineNames = GanttBaselinesService.getBaselineNames();
        }

        function toggleBaseline(name){
            GanttBaselinesService.toggleCurrentBaseline(name);
        }

        function isCurrentBaseline(name){
            return GanttBaselinesService.isCurrentBaseline(name);
        }

        function addBaseline(name){
            var tasks = GanttTasksService.getAll();
            GanttBaselinesService.addBaseline(name, tasks);
            ctrl.name = '';
        }

        function deleteBaseline(name){
            GanttBaselinesService.deleteBaseline(name);
        }
    }
})();