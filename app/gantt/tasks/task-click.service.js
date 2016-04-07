(function () {
    angular.module('gantt').factory('TaskClickService', TaskClickService);

    function TaskClickService(GanttTasksService, $rootScope) {
        var tasksSelectionMap = {};
        var selectedTasksCount = 0;
        var lastRightClicked = null;

        var service = {
            toggleTask: toggleTask,
            isTaskSelected: isTaskSelected,
            registerRightClick: registerRightClick,
            getSelectedTasks: getSelectedTasks,
            getSelectedTasksIDs: getSelectedTasksIDs,
            getSelectedTasksCount: getSelectedTasksCount,
            getSelectedTasksNames: getSelectedTasksNames,
            selectAll: selectAll,
            unselectAll: unselectAll,
            getRightClickedTaskID: getRightClickedTaskID,
            hasSelectedTasks: hasSelectedTasks
        };

        init();
        return service;

        function init() {
            $rootScope.$on('gantt-reloaded', unselectAll);
        }

        function toggleTask(id) {
            tasksSelectionMap[id] = !tasksSelectionMap[id];
            selectedTasksCount += (tasksSelectionMap[id] ? 1 : -1);
        }

        function selectAll() {
            var tasks = GanttTasksService.getAll();
            tasks.forEach((task)=>tasksSelectionMap[task.id] = true);
            selectedTasksCount = GanttTasksService.getTasksCount();
        }

        function unselectAll() {
            var tasks = GanttTasksService.getAll();
            tasks.forEach((task)=>tasksSelectionMap[task.id] = false);
            selectedTasksCount = 0;
        }

        function registerRightClick(id) {
            lastRightClicked = id;
        }

        function getRightClickedTaskID(){
            return lastRightClicked;
        }

        function isTaskSelected(id) {
            return tasksSelectionMap[id];
        }

        function hasSelectedTasks(){
            return selectedTasksCount > 0;
        }

        function getSelectedTasks() {
            var tasks = GanttTasksService.getAll();
            var selected = tasks.filter((task)=>tasksSelectionMap[task.id]);
            return selected;
        }

        function getSelectedTasksIDs(){
            return getSelectedTasks().map((task)=>task.id);
        }

        function getSelectedTasksCount() {
            return selectedTasksCount;
        }

        function getSelectedTasksNames() {
            var names = getSelectedTasks().map((task)=>task.name);
            return names;
        }
    }
})();