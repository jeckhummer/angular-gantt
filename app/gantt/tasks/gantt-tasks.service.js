(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTaskFactoryService, GanttDataHTTPService, GanttOptionsService, $rootScope) {
        var tasks = [];
        var newID = 1;

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
            moveTaskUp: moveTaskUp
        };

        init();
        return service;

        function init() {
            reload();
        }

        function reload() {
            GanttDataHTTPService.getTasks()
                .then(clearTasks)
                .then(addTaskLocally);
        }

        function getAll() {
            return tasks;
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

        function getTask(id) {
            var index = searchTaskByID(id);
            return tasks[index];
        }

        function isEmpty() {
            return tasks.length == 0;
        }

        function clearTasks(data) {
            tasks.length = 0;
            onTaskChanges();
            return data;
        }

        function deleteTask(id) {
            tasks.forEach((task, i)=> {
                if (task.id == id) tasks.splice(i, 1);
            });
            onTaskChanges();
        }

        function addTask(data) {
            data.id = newID;
            addTaskLocally([data]);
            return GanttDataHTTPService.saveTask(data);
        }

        function addTaskLocally(data) {
            data = angular.isArray(data) ? data : [data];

            angular.forEach(data, function (taskData) {
                var task = GanttTaskFactoryService.create(taskData);
                var siblings = _getSubTasks(taskData.parentID);
                var order = taskData.order ? taskData.order : _getOrderBoundaries(siblings).max + 1;

                task.order = order;
                tasks.push(task);

                if (newID <= task.id) newID = task.id + 1;
            });

            onTaskChanges();
        }

        function updateTask(data) {
            updateTaskLocally(data);
            return GanttDataHTTPService.saveTask(data);
        }

        function updateTaskLocally(data) {
            var index = searchTaskByID(data.id);
            var task = tasks[index];

            var parentChanged = data.parentID != task.parentID;
            if (parentChanged) {
                var order = _moveTasksAndGetNewOrderIndex(data.parentID);
                data.order = order;
            }

            tasks[index] = data;
            onTaskChanges();
        }

        function _moveTasksAndGetNewOrderIndex(parentID){
            var subs = _getSubTasks(parentID);
            var order;

            var strategy = GanttOptionsService.getTaskMovementStrategy();
            if (strategy == GanttOptionsService.TASK_MOVEMENT_STRATEGIES.APPEND) {
                order = _getOrderBoundaries(subs).max + 1;
            } else
            if (strategy == GanttOptionsService.TASK_MOVEMENT_STRATEGIES.PREPEND) {
                angular.forEach(subs, function(subTask){
                    subTask.order++;
                });
                order = 1;
            }
            return order;
        }

        function onTaskChanges() {
            _initParentState();
            _orderTasks();
            $rootScope.$broadcast('tasks-changed');
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
                    //angular.forEach(sortedTasks, function (task) {
                    //    task.nestingDepth = ;
                    //});

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

        function getHighLevelTasks() {
            return tasks.filter(function (task) {
                return !task.parentID;
            });
        }

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

        function _getOrderBoundaries(tasks){
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

        function isLastTaskWithinSiblings(id) {
            return _getNextByOrderTask(id) == null;
        }

        function isFirstTaskWithinSiblings(id) {
            return _getPrevByOrderTask(id) == null;
        }

        function moveTaskUp(id) {
            var prevTask = _getPrevByOrderTask(id);
            if (!prevTask) return;

            var prevTaskOrder = prevTask.order;
            var task = getTask(id);
            var taskOrder = task.order;

            prevTask.order = taskOrder;
            task.order = prevTaskOrder;

            onTaskChanges();
        }

        function moveTaskDown(id) {
            var nextTask = _getNextByOrderTask(id);
            if (!nextTask) return;

            var nextTaskOrder = nextTask.order;
            var task = getTask(id);
            var taskOrder = task.order;

            nextTask.order = taskOrder;
            task.order = nextTaskOrder;

            onTaskChanges();
        }

        function orderTestPrint() {
            var str = '';
            angular.forEach(tasks, function (task) {
                str += `id-${task.id} pid-${task.parentID} ord-${task.order} \n`;
            });
        }
    }
})();