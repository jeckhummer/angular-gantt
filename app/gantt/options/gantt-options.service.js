'use strict';
(function () {
    angular.module('gantt').factory('GanttOptionsService', GanttOptionsService);

    function GanttOptionsService() {
        var indentOptions = new GradientOption(0, 50, 5, 10);
        var zoomOptions = new GradientOption(100, 100000, 50, 100);

        var TASK_ADDITION_STRATEGIES = {
            'PREPEND': 0,
            'APPEND': 1
        };
        var taskMovementStrategy = TASK_ADDITION_STRATEGIES.PREPEND;

        var _masterMode = true;
        var _DOCID = 0;
        var _UID = 0;
        var _LOGUID = 0;
        var _projectName = '--';

        var service = {
            getTaskAdditionStrategy: getTaskAdditionStrategy,
            TASK_ADDITION_STRATEGIES: TASK_ADDITION_STRATEGIES,
            zoomOptions: zoomOptions,
            indentOptions: indentOptions,
            isMasterMode: isMasterMode,
            toggleMasterMode: toggleMasterMode,
            setMasterMode: setMasterMode,
            getUserID: getUserID,
            setUserID: setUserID,
            getLogUserID: getLogUserID,
            setLogUserID: setLogUserID,
            getDOCID: getDOCID,
            setDOCID: setDOCID,
            getProjectID: getProjectID,
            setProjectID: setProjectID,
            LEFT_BLOCK_MAX_WIDTH: "45%",
            LEFT_BLOCK_MIN_WIDTH: "250px"
        };
        return service;

        function isMasterMode(){
            return _masterMode;
        }

        function toggleMasterMode(){
            console.log('master mode',_masterMode);
            _masterMode = !_masterMode;
            return _masterMode;
        }

        function setMasterMode(val){
            _masterMode = val;
            return _masterMode;
        }

        function getTaskAdditionStrategy(){
            return taskMovementStrategy;
        }

        function getUserID(){
            return _UID;
        }

        function setUserID(UID){
            _UID = UID;
        }

        function getLogUserID(){
            return _LOGUID;
        }

        function setLogUserID(LOGUID){
            _LOGUID = LOGUID;
        }

        function getDOCID(){
            return _DOCID;
        }

        function setDOCID(DOCID){
            _DOCID = DOCID;
        }

        function getProjectID() {
            return _projectName;
        }
        
        function setProjectID(projectName) {
            _projectName = projectName;
        }
    }
})();

