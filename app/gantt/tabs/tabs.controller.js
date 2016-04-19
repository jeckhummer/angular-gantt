(function(){
    angular.module('gantt').controller('TabsController', TabsController);

    function TabsController (GanttTasksService, GanttOptionsService) {
        var ctrl = this;
        ctrl.reload = reload;
        ctrl.ganttIsEmpty = GanttTasksService.isEmpty;
        ctrl.isMasterMode = GanttOptionsService.isMasterMode;

        function reload(){
            GanttTasksService.reload();
        }
    }
})();