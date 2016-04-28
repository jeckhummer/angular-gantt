(function(){
    angular.module('gantt').controller('InitializationController', InitializationController);

    function InitializationController (GanttOptionsService) {
        var initCtrl = this;

        initCtrl.init = init;

        function init(masterMode, userID, logUserID, DOCID, projectName){
            GanttOptionsService.setMasterMode(masterMode);
            GanttOptionsService.setUserID(userID);
            GanttOptionsService.setLogUserID(logUserID);
            GanttOptionsService.setDOCID(DOCID);
            GanttOptionsService.setProjectName(projectName);
        }
    }
})();