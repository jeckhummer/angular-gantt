(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTimelineService, GanttTasksService, $scope, $q, $rootScope) {
        var ganttCtrl = this;

        var dataDefer = $q.defer();
        var timelineDefer = $q.defer();

        ganttCtrl.isEmpty = true;
        ganttCtrl.timelineConfig = GanttTimelineService.getConfig();

        $scope.$on('tasks-changed', TasksDataChangesHandler);
        $scope.$on('boundaries-changed', BoundariesChangesHandler);
        $scope.$on('gantt-timeline-config-changed', TimelineConfigChangesHandler);

        $rootScope.$broadcast('notify-fade', 'Loading user timeline settings ...', timelineDefer.promise);
        $rootScope.$broadcast('notify-fade', 'Loading tasks data ...', dataDefer.promise);

        ganttCtrl.json = function(val){
            return JSON.stringify(val);
        };

        function TimelineConfigChangesHandler(){
            ganttCtrl.timelineConfig = GanttTimelineService.getConfig();
            timelineDefer.resolve();
        }

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
            dataDefer.resolve();
        }

        function BoundariesChangesHandler(){
            ganttCtrl.boundaries = GanttTimelineService.getBoundaries();
        }
    }
})();