(function(){
    angular.module('gantt').controller('GanttBaselinesController', GanttBaselinesController);

    function GanttBaselinesController (GanttBaselinesService, GanttTasksService, TaskClickService, $scope) {
        var ctrl = this;
        ctrl.toggleBaseline = toggleBaseline;
        ctrl.isCurrentBaseline = isCurrentBaseline;
        ctrl.addBaseline = addBaseline;
        ctrl.deleteBaseline = deleteBaseline;
        ctrl.getTasksCount = getTasksCount;
        ctrl.getTaskNames = getTaskNames;
        ctrl.name = '';

        init();

        function init(){
            $scope.$on('baselines-changed', initNames);
            $('#selected-tasks-names').popover({
                'trigger': 'hover',
                'html': true,
            });
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
            var selectedTasks = TaskClickService.getSelectedTasks();
            var allTasks = GanttTasksService.getAll();
            var tasks = selectedTasks.length ? selectedTasks : allTasks;

            GanttBaselinesService.addBaseline(name, tasks);
            ctrl.name = '';
        }

        function deleteBaseline(name){
            GanttBaselinesService.deleteBaseline(name);
        }

        function getTasksCount(){
            var selectedTasksCount = TaskClickService.getSelectedTasksCount();
            var tasksTotalCount = GanttTasksService.getTasksCount();
            var allTasksSelected =
                tasksTotalCount == selectedTasksCount || selectedTasksCount == 0;

            return !allTasksSelected ?
                (selectedTasksCount == 1 ? '1 task' : `${selectedTasksCount} tasks`) :
                "All Tasks";
        }

        function getTaskNames(){
            var str = "";

            var selectedTasksNames = TaskClickService.getSelectedTasksNames();
            var allTasksNames = GanttTasksService.getTasksNames();
            var names = selectedTasksNames.length ? selectedTasksNames : allTasksNames;

            names.forEach((name)=>str += `${name}<br />`);
            return str;
        }
    }
})();