(function(){
    angular.module('gantt').controller('GanttTaskResourceController', GanttTaskResourceController);

    function GanttTaskResourceController(GanttProjectsService, $scope){
        var ctrl = this;
        ctrl.init = init;

        function init(data) {
            var resource = data.resource;
            ctrl.id = resource.id;
            ctrl.name = resource.name;
            ctrl.assignedToProjects = resource.assignedToProjects;
            ctrl.employmentHours = data.hours;
            ctrl.employmentPercentage = Math.floor(100 * ctrl.employmentHours / 8);

            initProjectNames();
            $scope.$on('projects.data-update', initProjectNames);
        }

        function initProjectNames() {
            var projectNames = ctrl.assignedToProjects.map(function (projectID) {
                var project = GanttProjectsService.getProject(projectID);
                return project ? project.name : 'Project #' + projectID;
            });

            ctrl.projectsString = projectNames.join(', ');
            ctrl.projectsList = projectNames.join('<br />');
        }
    }
})();
