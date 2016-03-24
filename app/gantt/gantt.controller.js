(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (TimelineService, GanttTasksService, $scope, $q, $rootScope) {
        var ganttCtrl = this;

        var dataDefer = $q.defer();

        ganttCtrl.isEmpty = true;

        $scope.$on('tasks-changed', TasksDataChangesHandler);
        //$scope.$on('boundaries-changed', BoundariesChangesHandler);

        $rootScope.$broadcast('notify-fade', 'Loading tasks data ...', dataDefer.promise);

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
            dataDefer.resolve();
        }

        //function BoundariesChangesHandler(){
        //    ganttCtrl.boundaries = TimelineService.getBoundaries();
        //}
    }
})();