(function(){
    angular.module('gantt').controller('GanttTaskResourceController', GanttTaskResourceController);

    function GanttTaskResourceController(){
        var ctrl = this;

        ctrl.init = init;

        function init(data) {
            ctrl.name = data.name;
            ctrl.projects = data.projects;
            ctrl.employmentHours = data.employmentHours;
            ctrl.employmentPercentage = data.employmentPercentage;
            ctrl.isAssignedToThisProject = data.isAssignedToThisProject;

            ctrl.projectsString = ctrl.projects.join(', ');
            ctrl.projectsList = ctrl.projects.join('<br />');
        }
    }
})();
