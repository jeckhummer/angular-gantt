(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTasksDictionaryService, GanttTaskFactoryService, $rootScope,
                               GanttTasksDataProviderService, GanttTasksHierarchyService,
                               GanttOptionsService, NotificationService) {
        var service = {
            ready: false,
            reload: reload,
            getAll: getAll,
            getTask: GanttTasksDictionaryService.get,
            getTasksCount: GanttTasksDictionaryService.getSize,
            getTasksNames: getTasksNames,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            moveTaskUp: moveTaskUp,
            moveTaskDown: moveTaskDown,
            isEmpty: GanttTasksDictionaryService.isEmpty
        };

        init();
        return service;

        function init() {
            reload();
        }

        function getAll() {
            var tasks = GanttTasksHierarchyService.getAllTasks();
            return tasks;
        }

        function getTasksNames() {
            return GanttTasksDictionaryService.processRange(function (task) {
                return task.name;
            });
        }

        function addTask(data) {
            var prepend = GanttOptionsService.getTaskAdditionStrategy();
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.addTask(data, prepend);
            }, 'Saving task');
        }

        function updateTask(data) {
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.updateTask(data);
            }, 'Updating task');
        }

        function deleteTask(id) {
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.deleteTask(id);
            }, 'Deleting task');
        }

        function reload() {
            var suppressOK = true;
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.getTasks();
            }, 'Loading tasks', suppressOK);
        }

        function moveTaskUp(id) {
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.moveTaskUp(id);
            }, 'Moving task');
        }

        function moveTaskDown(id) {
            return _modifyGanttState(function () {
                return GanttTasksDataProviderService.moveTaskDown(id);
            }, 'Moving task');
        }


        function _initTasks(tasksData) {
            var tasks = tasksData.map(function (data) {
                return GanttTaskFactoryService.create(data);
            });

            GanttTasksDictionaryService.reset();
            GanttTasksDictionaryService.addRange(tasks);

            $rootScope.$broadcast('tasks-changed', tasks);
            service.ready = true;
        }

        function _modifyGanttState(action, msg, suppressOK) {
            var promise = action().then(_initTasks);
            NotificationService.notifyLock(msg, promise, suppressOK);
            service.ready = false;
            return promise;
        }
    }
})();