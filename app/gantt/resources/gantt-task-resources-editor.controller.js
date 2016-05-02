(function(){
    angular.module('gantt').controller('GanttTaskResourcesEditorController', GanttTaskResourcesEditorController);

    function GanttTaskResourcesEditorController($scope, GanttResourcesService, GanttOptionsService){
        var ctrl = this;
        _init();

        function _init() {
            ctrl.resources = GanttResourcesService.getAll(); // initial value
            $scope.$on('gantt.task.resources.changed', _onResourcesChanged);
        }

        function _onResourcesChanged(event, args) {
            _populateResources();
        }

        function _populateResources() {
            var resources = GanttResourcesService.getAll();
            var currentProjectName = GanttOptionsService.getProjectName();

            resources.map(function (resource) {
                resource.isAssignedToThisProject = resource.projects.indexOf(currentProjectName) > -1;
            });
            ctrl.resources = resources;
        }
    }
})();
