(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTasksDictionaryService, GanttTaskFactoryService, DialogService,
                               $rootScope, GanttTasksDataProviderService, GanttTasksHierarchyService) {
        var service = {
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
            return _modifyGanttState(()=>GanttTasksDataProviderService.addTask(data), 'Saving task');
        }

        function updateTask(data) {
            return _modifyGanttState(()=>GanttTasksDataProviderService.updateTask(data), 'Updating task');
        }

        function deleteTask(id) {
            return _modifyGanttState(()=>GanttTasksDataProviderService.deleteTask(id), 'Deleting task');
        }

        function reload() {
            return _modifyGanttState(()=>GanttTasksDataProviderService.getTasks(), 'Fetching tasks');
        }

        function moveTaskUp(id){
            return _modifyGanttState(()=>GanttTasksDataProviderService.moveTaskUp(id), 'Moving task');
        }

        function moveTaskDown(id){
            return _modifyGanttState(()=>GanttTasksDataProviderService.moveTaskDown(id), 'Moving task');
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

        function _processingLock(promise){
            DialogService.activateDialog('processing-lock', null, true);
            promise.then(function () {
                DialogService.deactivateDialog('processing-lock');
            });
        }

        function _modifyGanttState(action, msg){
            var promise = action().then(_initTasks,_notifyAboutError(msg));
            _processingLock(promise);
            $rootScope.$broadcast('notify-fade', msg + '...', promise);
            return promise;
        }
    }
})();