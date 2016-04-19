(function(){
    angular.module('gantt').controller('InitializationController', InitializationController);

    function InitializationController (GanttOptionsService) {
        var initCtrl = this;

        initCtrl.setMasterMode = GanttOptionsService.setMasterMode;
    }
})();