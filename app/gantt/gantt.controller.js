(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTasksService, GanttOptionsService, $scope, $q, $rootScope) {
        var ganttCtrl = this;
        var dataDefer = $q.defer();

        ganttCtrl.isEmpty = true;
        ganttCtrl.getInfoBlockWidth = getInfoBlockWidth;
        ganttCtrl.getTasksBlockWidth = getTasksBlockWidth;
        ganttCtrl.getZoom = getZoom;
        ganttCtrl.isZoomed = isZoomed;
        ganttCtrl.infoBlockWidth = GanttOptionsService.infoBlockWidthOptions;

        $scope.$on('tasks-changed', TasksDataChangesHandler);
        $rootScope.$broadcast('notify-fade', 'Loading tasks ...', dataDefer.promise);

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.taskIDs = GanttTasksService.getTasksIDs();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
            dataDefer.resolve();
        }

        function getInfoBlockWidth(){
            return GanttOptionsService.getInfoBlockWidth();
        }

        function getTasksBlockWidth(){
            return 100 - getInfoBlockWidth();
        }

        function getZoom(){
            return GanttOptionsService.getZoom();
        }

        function isZoomed(){
            var zoom = getZoom();
            return  100 < zoom;
        }
    }
})();