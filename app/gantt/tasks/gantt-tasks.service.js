(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTasksDictionaryService, GanttTaskFactoryService, $rootScope,
                               GanttTasksDataProviderService, GanttTasksHierarchyService) {
        var service = {
            reload: reload,
            getAll: getAll,
            getTask: GanttTasksDictionaryService.get,
            getTasksCount: GanttTasksDictionaryService.getSize,
            getTasksNames: getTasksNames,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            isEmpty: GanttTasksDictionaryService.isEmpty
        };

        init();
        return service;

        function init() {
            reload();
        }

        function getAll(){
            var tasks = GanttTasksHierarchyService.getAll((node) => GanttTasksDictionaryService.get(node.ID));
            return tasks;
        }

        function getTasksNames() {
            return GanttTasksDictionaryService.processRange(function (task) {
                return task.name;
            });
        }

        function addTask(data) {
            var promise = GanttTasksDataProviderService.addTask(data)
                .then(_initTasks, _notifyAboutError('Saving task'));

            $rootScope.$broadcast('notify-fade', 'Saving task...', promise);
            return promise;
        }

        function updateTask(data) {
            var promise = GanttTasksDataProviderService.updateTask(data)
                .then(_initTasks, _notifyAboutError('Updating task'));

            $rootScope.$broadcast('notify-fade', 'Updating task...', promise);
            return promise;
        }

        function deleteTask(id) {
            var promise = GanttTasksDataProviderService.deleteTask(id)
                .then(_initTasks, _notifyAboutError('Deleting task'));

            $rootScope.$broadcast('notify-fade', 'Deleting task...', promise);
            return promise;
        }

        function reload() {
            var promise = GanttTasksDataProviderService.getTasks()
                .then(_initTasks,_notifyAboutError('Fetching tasks'));

            $rootScope.$broadcast('notify-fade', 'Reloading gantt...', promise);
            return promise;
        }

        function _initTasks(tasksData) {
            var tasks = tasksData.map((data) => GanttTaskFactoryService.create(data));

            GanttTasksDictionaryService.reset();
            GanttTasksDictionaryService.addRange(tasks);

            $rootScope.$broadcast('tasks-changed', tasks);
        }

        function _notifyAboutError(description) {
            return function (error) {
                var isError = true;
                var msg = `${description} error: ${error}`;
                $rootScope.$broadcast('notify', msg, isError);
            }
        }
    }
})();