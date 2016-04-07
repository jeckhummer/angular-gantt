(function(){
    angular.module('gantt').controller('TabsController', TabsController);

    function TabsController (GanttTasksService) {
        var ctrl = this;
        ctrl.reload = reload;

        function reload(){
            GanttTasksService.reload();
        }
    }
})();