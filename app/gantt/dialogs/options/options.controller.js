(function(){
    angular.module('gantt').controller('OptionsController', OptionsController);

    function OptionsController ($rootScope, GanttOptionsService) {
        var ctrl = this;

        ctrl.save = save;
        ctrl.masterMode = GanttOptionsService.isMasterMode();
        ctrl.toggleMasterMode = GanttOptionsService.toggleMasterMode;

        function save(){
            $rootScope.$broadcast('options.save');
        }
    }
})();