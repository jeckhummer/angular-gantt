(function(){
    angular.module('gantt').controller('InitializationController', InitializationController);

    function InitializationController (GanttOptionsService) {
        var initCtrl = this;

        initCtrl.setMasterMode = setMasterMode;

        function setMasterMode(val){
            GanttOptionsService.masterMode = !!val;
        }
    }
})();