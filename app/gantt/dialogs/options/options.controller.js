(function(){
    angular.module('gantt').controller('OptionsController', OptionsController);

    function OptionsController ($scope, GanttOptionsService) {
        var ctrl = this;

        ctrl.save = save;
        ctrl.masterMode = GanttOptionsService.isMasterMode();
        ctrl.toggleMasterMode = GanttOptionsService.toggleMasterMode;

        function save(){
            $scope.$broadcast('options.save');
        }
    }
})();