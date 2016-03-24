(function () {
    angular.module('gantt').controller('TaskContextMenuController', TaskContextMenuController);

    function TaskContextMenuController(DialogService, GanttTasksService, TaskClickService) {
        var ctrl = this;

        ctrl.saveAsBaseline = saveAsBaseline;
        ctrl.deleteTask = deleteTask;
        ctrl.deleteSelectedTasks = deleteSelectedTasks;
        ctrl.hasSelectedTasks = hasSelectedTasks;

        function saveAsBaseline(){
            DialogService.toggleDialog('baselines');
        }

        function deleteTask(){
            GanttTasksService.deleteTask(TaskClickService.getRightClickedTaskID());
        }

        function deleteSelectedTasks(){
            var selectedTasksIDs = TaskClickService.getSelectedTasksIDs();
            console.log(selectedTasksIDs);
            angular.forEach(selectedTasksIDs, (id)=>GanttTasksService.deleteTask(id));
        }

        function hasSelectedTasks(){
            return TaskClickService.hasSelectedTasks();
        }
    }
})();
