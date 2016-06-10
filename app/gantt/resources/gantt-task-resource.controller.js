(function(){
    angular.module('gantt').controller('GanttTaskResourceController', GanttTaskResourceController);

    function GanttTaskResourceController(GanttProjectsService, $scope, GanttResourcesActivityService){
        var ctrl = this;
        ctrl.init = init;

        function init(data, taskID) {
            var resource = data.resource;
            ctrl.taskID = taskID;
            ctrl.id = resource.id;
            ctrl.name = resource.name;
            ctrl.assignedToProjects = resource.assignedToProjects;
            ctrl.employmentHours = data.hours;
            ctrl.employmentPercentage = Math.floor(100 * ctrl.employmentHours / 8);

            initProjectNames();
            initConflicts();
            $scope.$on('projects.data-update', initProjectNames);
            $scope.$on('conflicts.data-update', initConflicts);
        }

        function initProjectNames() {
            var projectNames = ctrl.assignedToProjects.map(function (projectID) {
                var project = GanttProjectsService.getProject(projectID);
                return project ? project.name : 'Project #' + projectID;
            });

            ctrl.projectsString = projectNames.join(', ');
            ctrl.projectsList = projectNames.join('<br />');
        }

        function initConflicts() {
            ctrl.hasConflict = GanttResourcesActivityService.isResourceInConflict(ctrl.id, ctrl.taskID);
        }
    }
})();
