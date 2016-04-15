(function () {
    angular.module('app-dev').config(GanttTaskDataProviderServiceMockConfig);

    function GanttTaskDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttTasksDataProviderService", GanttTaskDataProviderServiceMock);
    }

    function GanttTaskDataProviderServiceMock(GanttTasksTestData, $timeout) {
        var service = {
            getTasks: getTasks,
            saveTask: saveTask,
            deleteTask: deleteTask,

        };

        var _tasks = [];

        var _DELAY_ENABLED = true;
        //var _DELAY_ENABLED = false;

        var _DELAYS = {
            getTask: 2000,
            saveTask: 3000,
            deleteTask: 2000
        };

        init();
        return service;

        function _getDelay(actionName){
            return _DELAY_ENABLED ? _DELAYS[actionName] : 0;
        }

        function _getPromise(actionName, action){
            var delay = _getDelay(actionName);
            return $timeout(action, delay);
        }

        function init(){
            _tasks = GanttTasksTestData.tasks;
        }

        function getTasks(){
            var promise = _getPromise('getTask', function () {
                return _tasks;
            });
            return promise;
        }

        function saveTask(task){
            console.log('saving gantt task: ', task);

            var response = {
                save: {
                    success: {
                        status: 'success',
                        message: 'added!',
                        id: 99,
                        order: 1
                    },
                    error: {
                        status: 'error',
                        message: 'Shit happens!'
                    }
                },
                delete: {
                    success: {
                        status: 'success',
                        message: 'deleted!'
                    },
                    error: {
                        status: 'error',
                        message: 'Shit happens!'
                    }
                }
            };

            var promise = _getPromise('saveTask', function () {
                var index = searchTaskByID(task.id);
                _tasks[index] = task;
                return response.save.success;
            });

            return promise;
        }

        function deleteTask(id) {
            var promise = _getPromise(function () {
                _tasks.forEach((task, i)=> {
                    if (task.id == id) tasks.splice(i, 1);
                });
                return response.delete.success;
            });

            return promise;
        }

        function searchTaskByID(id) {
            var index;
            for (var i in _tasks) {
                if (_tasks[i].id == id) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        function moveTaskUp(id) {
            var prevTask = _getPrevByOrderTask(id);
            if (!prevTask) return;

            var prevTaskOrder = prevTask.order;
            var task = getTask(id);
            var taskOrder = task.order;

            prevTask.order = taskOrder;
            task.order = prevTaskOrder;

            _onTasksModified();
        }

        function moveTaskDown(id) {
            var nextTask = _getNextByOrderTask(id);
            if (!nextTask) return;

            var nextTaskOrder = nextTask.order;
            var task = getTask(id);
            var taskOrder = task.order;

            nextTask.order = taskOrder;
            task.order = nextTaskOrder;

            _onTasksModified();
        }

        function swapTasks(){

        }
    }
}());