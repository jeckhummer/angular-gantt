(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTasksService, GanttOptionsService, $scope, TimelineService,
                              GanttBaselinesService, GanttProjectsService) {
        var ganttCtrl = this;

        var _projectID = GanttOptionsService.getProjectID();

        ganttCtrl.isEmpty = true;
        ganttCtrl.zoom = GanttOptionsService.zoomOptions;
        ganttCtrl.isZoomed = isZoomed;
        ganttCtrl.isMasterMode = GanttOptionsService.isMasterMode;
        ganttCtrl.getTodayLineLeft = TimelineService.getTodayLineWidth;
        ganttCtrl.getCurrentBaselineName = GanttBaselinesService.getCurrentBaselineName;

        ganttCtrl.projectName = 'Project #' + _projectID;
        ganttCtrl.leftBlockWidth = 1000;
        ganttCtrl.leftBlockMinWidth = GanttOptionsService.LEFT_BLOCK_MIN_WIDTH;
        ganttCtrl.leftBlockMaxWidth = GanttOptionsService.LEFT_BLOCK_MAX_WIDTH;
        ganttCtrl.onScroll = onScroll;
        ganttCtrl.scrollPosition = 0;

        connect();

        function connect() {
            $scope.$on('tasks-changed', TasksDataChangesHandler);
            $scope.$on('angular-resizable.resizing', function (event, info) {
                $scope.$apply(function () {
                    ganttCtrl.leftBlockWidth = info.width;
                });
            });
            $scope.$on('projects.data-update', function(){
                var project = GanttProjectsService.getProject(_projectID);
                if(project){
                    ganttCtrl.projectName = project.name;
                }
            });
        }

        function onScroll(e) {
            ganttCtrl.scrollPositionLeft = e.target.scrollLeft;
            ganttCtrl.scrollPositionTop = e.target.scrollTop;
        }

        function TasksDataChangesHandler(){
            ganttCtrl.tasks = GanttTasksService.getAll();
            ganttCtrl.isEmpty = GanttTasksService.isEmpty();
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