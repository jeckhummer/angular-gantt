(function(){
    angular.module('gantt').controller('TaskListController', TaskListController);

    function TaskListController(GanttTasksService) {
        var ctrl = this;
        ctrl.tasks = GanttTasksService.getAll();
        //console.log(ctrl.tasks);
    }
})();