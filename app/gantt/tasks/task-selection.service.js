(function () {
    angular.module('gantt').factory('TaskSelectionService', TaskSelectionService);

    function TaskSelectionService() {
        var selectedTasksIDs = {};

        var service = {
            toggleTask: toggleTask,
            isTaskSelected: isTaskSelected
        };

        init();
        return service;

        function init() {
        }

        function toggleTask(id){
            selectedTasksIDs[id] = !selectedTasksIDs[id];
        }

        function isTaskSelected(id){
            return selectedTasksIDs[id];
        }
    }
})();