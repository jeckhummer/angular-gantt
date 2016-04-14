(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTasksDictionaryService, GanttTaskFactoryService,
                               GanttTasksDataProviderService, TreeFactoryService,
                               GanttTasksTreeDataProviderFactoryService, $rootScope) {
        var tasksIDTree = null;

        var service = {
            reload: reload,
            getAll: getAll,
            getTask: GanttTasksDictionaryService.get,
            getTasksCount: GanttTasksDictionaryService.getSize,
            getTasksNames: getTasksNames,
            getTasksIDs: getTasksIDs,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            isEmpty: GanttTasksDictionaryService.isEmpty,
            isLastTaskWithinSiblings: isLastTaskWithinSiblings,
            isFirstTaskWithinSiblings: isFirstTaskWithinSiblings,
            moveTaskDown: moveTaskDown,
            moveTaskUp: moveTaskUp
        };

        init();
        return service;

        function init() {
            reload();
        }

        function getAll(){
            var tasks = [];

            if(tasksIDTree){
                tasks = tasksIDTree.getAll(function (node) {
                    var task = GanttTasksDictionaryService.get(node.ID);
                    return Object.assign(task, {
                        level: node.level

                    });
                });
            }

            return tasks;
        }

        function getTasksNames() {
            return GanttTasksDictionaryService.processRange(function (task) {
                return task.name;
            });
        }

        function getTasksIDs() {
            return GanttTasksDictionaryService.processRange(function (task) {
                return task.id;
            });
        }

        function isLastTaskWithinSiblings(id) {
            //return _getNextByOrderTask(id) == null;
        }

        function isFirstTaskWithinSiblings(id) {
            //return _getPrevByOrderTask(id) == null;
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
            // TODO: remove
            //var promise = GanttTasksDataProviderService.updateTask(data);
            //promise.then(reload)
            //.then(
            //    function (tasks) {
            //        angular.forEach(tasks, function (task) {
            //            var id = searchTaskByID(task.id);
            //            var taskIsNew = id != null;
            //
            //            if (taskIsNew) {
            //                _addTaskLocally(task);
            //            } else {
            //                _updateTaskLocally(task);
            //            }
            //        });
            //        _onTasksModified();
            //    },
            //    function (error) {
            //        var isError = true;
            //        var msg = `Task updating failure! error: ${error}`;
            //        $rootScope.$broadcast('notify', msg, isError);
            //    }
            //);
            //return promise;
        }

        function deleteTask(id) {
            var promise = GanttTasksDataProviderService.deleteTask(id)
                .then(_initTasks, _notifyAboutError('Deleting task'));

            $rootScope.$broadcast('notify-fade', 'Deleting task...', promise);
            return promise;
            // TODO: remove
            //var promise = GanttTasksDataProviderService.deleteTask(id);
            //promise.then(
            //    function (id) {
            //        tasks.forEach(function (task, i) {
            //            if (task.id == id) tasks.splice(i, 1);
            //        });
            //        _onTasksModified();
            //    },
            //    function (error) {
            //        var isError = true;
            //        var msg = `Task deleting failure! error: ${error}`;
            //        $rootScope.$broadcast('notify', msg, isError);
            //    }
            //);
            //return promise;
        }

        function reload() {
            var promise = GanttTasksDataProviderService.getTasks()
                .then(_initTasks,_notifyAboutError('Fetching tasks'));

            $rootScope.$broadcast('notify-fade', 'Reloading gantt...', promise);
            return promise;
        }

        function moveTaskUp(id) {
            //var prevTask = _getPrevByOrderTask(id);
            //if (!prevTask) return;
            //
            //var promise = GanttTasksDataProviderService.swapTasks(id, prevTask.id);
            //promise.then(
            //    function () {
            //        _swapTasksLocally(id, prevTask.id)
            //    },
            //    function (error) {
            //        var isError = true;
            //        var msg = `Tasks sync broken! error: ${error}`;
            //        $rootScope.$broadcast('notify', msg, isError);
            //    }
            //);
            //return promise;
        }

        function moveTaskDown(id) {
            //var nextTask = _getNextByOrderTask(id);
            //if (!nextTask) return;
            //
            //var promise = GanttTasksDataProviderService.swapTasks(id, nextTask.id);
            //promise.then(
            //    function () {
            //        _swapTasksLocally(id, nextTask.id)
            //    },
            //    function (error) {
            //        var isError = true;
            //        var msg = `Tasks sync broken! error: ${error}`;
            //        $rootScope.$broadcast('notify', msg, isError);
            //    }
            //);
            //return promise;
        }

        function _initTasks(tasksData) {
            var tasks = tasksData.map((data) => GanttTaskFactoryService.create(data));
            tasksIDTree = new TreeFactoryService.create(tasks, GanttTasksTreeDataProviderFactoryService);

            GanttTasksDictionaryService.reset();
            GanttTasksDictionaryService.addRange(tasks);

            $rootScope.$broadcast('tasks-changed');
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