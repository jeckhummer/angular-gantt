(function(){
    angular.module('gantt').controller('GanttTaskResourceController', GanttTaskResourceController);

    function GanttTaskResourceController(){
        var ctrl = this;
        ctrl.init = function (data) {
            ctrl.name = data.name;
            ctrl.projects = data.projects;
            ctrl.employmentHours = data.employmentHours;
            ctrl.employmentPercentage = data.employmentPercentage;

            ctrl.projectsString = ctrl.projects.map(project => project.name).join(', ');
            ctrl.projectsList = ctrl.projects.map(project => project.name).join('<br />');
        }
    }
})();
