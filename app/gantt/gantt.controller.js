(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTasksService, GanttOptionsService, $scope,
                              $q, $rootScope) {
        var ganttCtrl = this;
        var dataDefer = $q.defer();

        ganttCtrl.isEmpty = true;
        ganttCtrl.zoom = GanttOptionsService.zoomOptions;
        ganttCtrl.isZoomed = isZoomed;
        ganttCtrl.infoBlockWidth = GanttOptionsService.infoBlockWidthOptions;
        ganttCtrl.isMasterMode = GanttOptionsService.isMasterMode;

        $scope.$on('tasks-changed', TasksDataChangesHandler);
        $rootScope.$broadcast('notify-fade', 'Loading tasks ...', dataDefer.promise);

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
            dataDefer.resolve();
        }

        function getZoom(){
            return GanttOptionsService.getZoom();
        }

        function isZoomed(){
            var zoom = GanttOptionsService.zoomOptions.getValue();
            return  100 < zoom;
        }
    }
})();