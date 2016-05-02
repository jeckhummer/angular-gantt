(function () {
    angular.module('gantt').controller('GanttTaskContextMenuController', GanttTaskContextMenuController);

    function GanttTaskContextMenuController(DialogService, GanttTasksService, TaskClickService) {
        var ctrl = this;

        ctrl.saveAsBaseline = saveAsBaseline;
        ctrl.deleteTask = deleteTask;
        ctrl.deleteSelectedTasks = deleteSelectedTasks;
        ctrl.isSelectedTask = isSelectedTask;
        ctrl.toggleTask = toggleTask;
        ctrl.getToggleLabel = getToggleLabel;

        function saveAsBaseline(){
            DialogService.toggleDialog('baselines');
        }

        function deleteTask(){
            var id = TaskClickService.getRightClickedTaskID();
            GanttTasksService.deleteTask(id);
        }

        function deleteSelectedTasks(){
            var selectedTasksIDs = TaskClickService.getSelectedTasksIDs();
            angular.forEach(selectedTasksIDs, (id)=>{
                GanttTasksService.deleteTask(id);
            });
            TaskClickService.unselectAll();
        }

        function isSelectedTask(){
            var id = TaskClickService.getRightClickedTaskID();
            return TaskClickService.isTaskSelected(id);
        }

        function toggleTask(){
            var id = TaskClickService.getRightClickedTaskID();
            TaskClickService.toggleTask(id);
        }

        function getToggleLabel(){
            var label = (isSelectedTask() ? 'Uns' : 'S') + 'elect';
            return label;
        }
    }
})();
