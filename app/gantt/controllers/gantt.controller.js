(function(){
    angular.module('gantt').controller('GanttController', GanttController);

    function GanttController (GanttTasksService, GanttOptionsService, $scope, TimelineService,
                              GanttBaselinesService, GanttProjectsService) {
        var ganttCtrl = this;
        _init();

        function _init() {
            ganttCtrl.isEmpty = true;
            ganttCtrl.zoom = GanttOptionsService.zoomOptions;
            ganttCtrl.isZoomed = isZoomed;
            ganttCtrl.isMasterMode = GanttOptionsService.isMasterMode;
            ganttCtrl.getTodayLineLeft = TimelineService.getTodayLineWidth;
            ganttCtrl.getCurrentBaselineName = GanttBaselinesService.getCurrentBaselineName;
            ganttCtrl.getProjectName = getProjectName;
            ganttCtrl.leftBlockWidth = 1000;
            ganttCtrl.leftBlockMinWidth = GanttOptionsService.LEFT_BLOCK_MIN_WIDTH;
            ganttCtrl.leftBlockMaxWidth = GanttOptionsService.LEFT_BLOCK_MAX_WIDTH;
            ganttCtrl.onScroll = onScroll;
            ganttCtrl.scrollPosition = 0;

            $scope.$on('tasks-changed', TasksDataChangesHandler);
            $scope.$on('angular-resizable.resizing', function (event, info) {
                $scope.$apply(function () {
                    ganttCtrl.leftBlockWidth = info.width;
                });
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

        function getProjectName() {
            var projectID = GanttOptionsService.getProjectID();
            var projectName = `Project ID${projectID}`;

            if(!GanttProjectsService.isEmpty()){
                var project = GanttProjectsService.getProject(projectID);
                if(project){
                    projectName = project.name;
                }else{
                    console.log(`Error: no project with id = ${projectID}.`);
                }
            }

            return projectName;
        }
    }
})();