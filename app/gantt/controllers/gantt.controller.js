(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTimelineService, GanttTasksService, $scope) {
        var ganttCtrl = this;
        ganttCtrl.isEmpty = true;
        ganttCtrl.timelineTypesConfig = GanttTimelineService.getConfig();

        $scope.$on('gantt-tasks-data-changed', TasksDataChangesHandler);
        $scope.$on('gantt-timeline-config-changed', TimelineConfigChangesHandler);

        function TimelineConfigChangesHandler(){
            ganttCtrl.timelineTypesConfig = GanttTimelineService.getConfig();
        }

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.boundaries = GanttTasksService.getBoundaries();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
        }
    }
})();