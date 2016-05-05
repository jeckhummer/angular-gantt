(function(){
    angular.module('gantt').controller('GanttInitializationController', GanttInitializationController);

    function GanttInitializationController (GanttOptionsService) {
        var initCtrl = this;

        initCtrl.init = init;

        function init(masterMode, userID, logUserID, DOCID, projectID){
            GanttOptionsService.setMasterMode(masterMode);
            GanttOptionsService.setUserID(userID);
            GanttOptionsService.setLogUserID(logUserID);
            GanttOptionsService.setDOCID(DOCID);
            GanttOptionsService.setProjectID(projectID);
        }
    }
})();