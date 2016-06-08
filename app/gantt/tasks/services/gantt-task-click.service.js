(function () {
    angular.module('gantt').factory('TaskClickService', TaskClickService);

    function TaskClickService(GanttTasksService, $rootScope, GanttTasksDictionaryService) {
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
            $rootScope.$on('tasks-changed', unselectAll);
        }

        function toggleTask(id) {
            tasksSelectionMap[id] = !tasksSelectionMap[id];
            selectedTasksCount += (tasksSelectionMap[id] ? 1 : -1);
        }

        function selectAll() {
            var tasks = _getAllTasks();
            tasks.forEach(function (task) {
                tasksSelectionMap[task.id] = true;
            });
            selectedTasksCount = GanttTasksService.getTasksCount();
        }

        function unselectAll() {
            var tasks = _getAllTasks();
            tasks.forEach(function (task) {
                tasksSelectionMap[task.id] = false;
            });
            selectedTasksCount = 0;
        }

        function registerRightClick(id) {
            lastRightClicked = id;
        }

        function getRightClickedTaskID() {
            return lastRightClicked;
        }

        function isTaskSelected(id) {
            return tasksSelectionMap[id];
        }

        function hasSelectedTasks() {
            return selectedTasksCount > 0;
        }

        function getSelectedTasks() {
            var tasks = _getAllTasks();
            var selected = tasks.filter(function (task) {
                return tasksSelectionMap[task.id];
            });
            return selected;
        }

        function getSelectedTasksIDs() {
            return getSelectedTasks().map(function (task) {
                return task.id;
            });
        }

        function getSelectedTasksCount() {
            return selectedTasksCount;
        }

        function getSelectedTasksNames() {
            var names = getSelectedTasks().map(function (task) {
                return task.name;
            });
            return names;
        }

        function _getAllTasks() {
            var tasks = GanttTasksDictionaryService.getRange();
            return tasks;
        }
    }
})();