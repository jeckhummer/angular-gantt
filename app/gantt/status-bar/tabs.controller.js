(function(){
    angular.module('gantt').controller('TabsController', TabsController);

    function TabsController (GanttTasksService) {
        var ctrl = this;
        ctrl.reload = reload;
        ctrl.ganttIsEmpty = GanttTasksService.isEmpty;

        function reload(){
            GanttTasksService.reload();
        }
    }
})();