(function(){
    angular.module('gantt').controller('GanttTaskResourceController', GanttTaskResourceController);

    function GanttTaskResourceController(){
        var ctrl = this;
        ctrl.init = function (data) {
            var resource = data.resource;
            ctrl.name = resource.name;
            ctrl.projects = resource.projects;
            ctrl.employmentHours = data.hours;
            ctrl.employmentPercentage = Math.floor(100 * ctrl.employmentHours / 8);

            ctrl.projectsString = ctrl.projects.map(project => project.name).join(', ');
            ctrl.projectsList = ctrl.projects.map(project => project.name).join('<br />');
        }
    }
})();
