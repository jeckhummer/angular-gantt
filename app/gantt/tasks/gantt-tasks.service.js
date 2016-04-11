(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTaskFactoryService, GanttTasksDataProviderService, GanttOptionsService, $rootScope) {
        var tasks = [];
        //var newID = 1;

        var service = {
            getAll: getAll,
            isEmpty: isEmpty,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            getTask: getTask,
            getTasksCount: getTasksCount,
            getTasksNames: getTasksNames,
            getTasksIDs: getTasksIDs,
            getHighLevelTasks: getHighLevelTasks,
            isLastTaskWithinSiblings: isLastTaskWithinSiblings,
            isFirstTaskWithinSiblings: isFirstTaskWithinSiblings,
            moveTaskDown: moveTaskDown,
            moveTaskUp: moveTaskUp,
            reload: reload
        };

        init();
        return service;

        function init() {
            reload();
        }

        function getAll() {
            return tasks;
        }

        function getTask(id) {
            var index = searchTaskByID(id);
            return tasks[index];
        }

        function getTasksCount() {
            return tasks.length;
        }

        function getTasksNames() {
            return tasks.map((task)=>task.name);
        }

        function getTasksIDs() {
            return tasks.map((task)=>task.id);
        }

        function getHighLevelTasks() {
            return tasks.filter(function (task) {
                return !task.parentID;
            });
        }

        function isLastTaskWithinSiblings(id) {
            return _getNextByOrderTask(id) == null;
        }

        function isFirstTaskWithinSiblings(id) {
            return _getPrevByOrderTask(id) == null;
        }

        function isEmpty() {
            return tasks.length == 0;
        }

        function addTask(data) {
            var promise = GanttTasksDataProviderService.addTask(data);
            promise.then(
                function (task) {
                    _addTaskLocally([task]);
                    _onTasksModified();
                }, function (error) {
                    var isError = true;
                    var msg = `Task saving failure! error: ${error}`;
                    $rootScope.$broadcast('notify', msg, isError);
                }
            );
            return promise;
        }

        function updateTask(data) {
            var promise = GanttTasksDataProviderService.updateTask(data);
            promise.then(
                function (tasks) {
                    angular.forEach(tasks, function (task) {
                        var id = searchTaskByID(task.id);
                        var taskIsNew = id != null;

                        if (taskIsNew) {
                            _addTaskLocally(task);
                        } else {
                            _updateTaskLocally(task);
                        }
                    });
                    _onTasksModified();
                },
                function (error) {
                    var isError = true;
                    var msg = `Task updating failure! error: ${error}`;
                    $rootScope.$broadcast('notify', msg, isError);
                }
            );
            return promise;
        }

        function deleteTask(id) {
            var promise = GanttTasksDataProviderService.deleteTask(id);
            promise.then(
                function (id) {
                    tasks.forEach(function (task, i) {
                        if (task.id == id) tasks.splice(i, 1);
                    });
                    _onTasksModified();
                },
                function (error) {
                    var isError = true;
                    var msg = `Task deleting failure! error: ${error}`;
                    $rootScope.$broadcast('notify', msg, isError);
                }
            );
            return promise;
        }

        function reload() {
            var promise = GanttTasksDataProviderService.getTasks();
            promise.then(function (tasks) {
                clearTasks();
                _addTaskLocally(tasks);
                _onTasksModified();
                $rootScope.$broadcast('gantt-reloaded');
            });

            $rootScope.$broadcast('notify-fade', 'Reloading gantt...', promise);
            return promise;
        }

        function moveTaskUp(id) {
            var prevTask = _getPrevByOrderTask(id);
            if (!prevTask) return;

            var promise = GanttTasksDataProviderService.swapTasks(id, prevTask.id);
            promise.then(
                function () {
                    _swapTasksLocally(id, prevTask.id)
                },
                function (error) {
                    var isError = true;
                    var msg = `Tasks sync broken! error: ${error}`;
                    $rootScope.$broadcast('notify', msg, isError);
                }
            );
            return promise;
        }

        function moveTaskDown(id) {
            var nextTask = _getNextByOrderTask(id);
            if (!nextTask) return;

            var promise = GanttTasksDataProviderService.swapTasks(id, nextTask.id);
            promise.then(
                function () {
                    _swapTasksLocally(id, nextTask.id)
                },
                function (error) {
                    var isError = true;
                    var msg = `Tasks sync broken! error: ${error}`;
                    $rootScope.$broadcast('notify', msg, isError);
                }
            );
            return promise;
        }

        function _swapTasksLocally(id1, id2){
            var task1 = getTask(id1);
            var task1Order = task1.order;

            var task2 = getTask(id2);
            var task2Order = task2.order;

            task1.order = task2Order;
            task2.order = task1Order;

            _onTasksModified();
        }

        function clearTasks() {
            tasks.length = 0;
            _onTasksModified();
        }

        function _onTasksModified(){
            _initParentState();
            _orderTasks();
            $rootScope.$broadcast('tasks-changed');
        }

        function searchTaskByID(id) {
            var index;
            for (var i in tasks) {
                if (tasks[i].id == id) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        function _addTaskLocally(data) {
            data = angular.isArray(data) ? data : [data];

            angular.forEach(data, function (taskData) {
                var task = GanttTaskFactoryService.create(taskData);
                //var siblings = _getSubTasks(taskData.parentID);
                //var order = taskData.order ? taskData.order : _getOrderBoundaries(siblings).max + 1;
                //task.order = order;

                //if (newID <= task.id) newID = task.id + 1;
                tasks.push(task);
            });
        }

        function _updateTaskLocally(data) {
            var index = searchTaskByID(data.id);
            tasks[index] = data;
        }
        //-
        function _moveTasksAndGetNewOrderIndex(parentID) {
            var subs = _getSubTasks(parentID);
            var order;

            var strategy = GanttOptionsService.getTaskMovementStrategy();
            if (strategy == GanttOptionsService.TASK_MOVEMENT_STRATEGIES.APPEND) {
                order = _getOrderBoundaries(subs).max + 1;
            } else if (strategy == GanttOptionsService.TASK_MOVEMENT_STRATEGIES.PREPEND) {
                angular.forEach(subs, function (subTask) {
                    subTask.order++;
                });
                order = 1;
            }
            return order;
        }

        function _initParentState() {
            var parentTasksIDs = {};

            angular.forEach(tasks, function (task) {
                var ID = task.parentID;
                if (ID) {
                    parentTasksIDs[ID] = true;
                }
            });

            angular.forEach(tasks, function (task) {
                var ID = task.id;
                task.isParent = parentTasksIDs[ID];
            });
        }

        function _orderTasks() {
            var sortedTasks = [];
            var initLevel = getHighLevelTasks();
            var nestingDepth = -1;

            _sortRecursive(initLevel);

            function _sortRecursive(tasksLevel) {
                nestingDepth++;
                _sortTasksByOrder(tasksLevel);

                angular.forEach(tasksLevel, function (task) {
                    task.nestingDepth = nestingDepth;
                    sortedTasks.push(task);

                    var subTasks = _getSubTasks(task.id);
                    if (subTasks.length) {
                        _sortRecursive(subTasks);
                    }
                });
                nestingDepth--;
            }

            tasks = sortedTasks;
            orderTestPrint();
        }

        function _sortTasksByOrder(siblingTasks) {
            siblingTasks.sort(function (a, b) {
                return a.order - b.order;
            });
        }
        //+
        function _getSubTasks(id) {
            var subTasks = tasks.filter(function (task) {
                return task.parentID == id;
            });
            return subTasks;
        }

        function _getParentTask(id) {
            var task = getTask(id);
            var parentID = task.parentID;
            var parentTask = getTask(parentID);
            return parentTask;
        }

        function _getSiblingTasks(id) {
            var parentTask = _getParentTask(id);
            var siblings = parentTask ? _getSubTasks(parentTask.id) : getHighLevelTasks();
            return siblings;
        }

        function _getSiblingTaskByOrder(id, order) {
            var subTasks = _getSiblingTasks(id);
            for (var i in subTasks) {
                var subtask = subTasks[i];
                if (subtask.order == order) {
                    return subtask;
                }
            }
        }

        //-
        function _getOrderBoundaries(tasks) {
            var max = 0;
            var min = 0;

            angular.forEach(tasks, function (sibling) {
                var order = sibling.order;
                max = Math.max(order, max);
                min = Math.min(order, min);
            });

            var boundaries = {max: max, min: min};
            return boundaries;
        }

        function _getNextByOrderTask(id) {
            var task = getTask(id);
            var nextTask = _getSiblingTaskByOrder(task.id, task.order + 1);
            return nextTask;
        }

        function _getPrevByOrderTask(id) {
            var task = getTask(id);
            var prevTask = _getSiblingTaskByOrder(task.id, task.order - 1);
            return prevTask;
        }
    }
})();