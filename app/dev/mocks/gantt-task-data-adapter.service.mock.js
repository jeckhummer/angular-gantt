(function () {
    angular.module('app-dev').config(GanttTaskDataAdapterServiceMockConfig);

    function GanttTaskDataAdapterServiceMockConfig($provide) {
        $provide.decorator("GanttTasksDataProviderService", GanttTaskDataAdapterServiceMock);
    }

    function GanttTaskDataAdapterServiceMock(GanttTasksTestData, $timeout, $q,
                                             IDDictionaryFactoryService, TreeFactoryService) {
        var _dictionary;
        var _tree;

        var service = {
            getTasks: getTasks,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            moveTaskUp: moveTaskUp,
            moveTaskDown: moveTaskDown
        };

        var _DELAY_ENABLED = true;
        //var _DELAY_ENABLED = false;

        var _DELAYS = {
            getTasks: 500,
            addTask: 3500,
            updateTask: 3000,
            deleteTask: 3000
        };

        _init(GanttTasksTestData.tasks);
        return service;

        function _init(tasksData) {
            _dictionary = new IDDictionaryFactoryService.create((task)=>task.id);
            _dictionary.addRange(tasksData);

            _tree = new TreeFactoryService.create(tasksData, new _DataAdapterFactoryService());
        }

        function getTasks() {
            var promise = _getPromise('getTasks', function () {
                return _dictionary.getRange();
            });

            return promise;
        }

        function addTask(taskData, prepend) {
            console.log('saving gantt task: ', taskData);

            var newID = Math.max.apply(null, _dictionary.processRange((task)=>task.id)) + 1;
            taskData.id = newID;

            var node = _tree.add(taskData, prepend);
            if (node) {
                _dictionary.add(taskData);
                return getTasks();
            } else {
                return _getPromise('getTasks', function () {
                    return $q.reject('parent task doesn\'t exist!');
                });
            }
        }

        function updateTask(id) {
            var promise = _getPromise('updateTask', function () {
                //_dictionary.remove(id);
                //_dictionary.add(id);
                //_tree.remove(id);
                return _dictionary.getRange();
            });

            return promise;
        }

        function deleteTask(id) {
            var promise = _getPromise('deleteTask', function () {
                //_dictionary.remove(id);
                //_tree.remove(id);
                return _dictionary.getRange();
            });

            return promise;
        }

        function moveTaskUp(id) {
        }

        function moveTaskDown(id) {
        }

        function _DataAdapterFactoryService() {
            var service = new TreeDataAdapterFactory(IDAccessor, parentIDAccessor, orderAccessor);
            return service;

            function IDAccessor(data, val) {
                if (val !== undefined) {
                    data.id = val;
                } else {
                    return data.id;
                }
            }

            function parentIDAccessor(data, val) {
                if (val !== undefined) {
                    data.parentID = val;
                } else {
                    return data.parentID;
                }
            }

            function orderAccessor(data, val) {
                if (val !== undefined) {
                    data.order = val;
                } else {
                    return data.order;
                }
            }
        }

        function _getDelay(actionName) {
            return _DELAY_ENABLED ? _DELAYS[actionName] : 0;
        }

        function _getPromise(actionName, action) {
            var delay = _getDelay(actionName);
            return $timeout(action, delay);
        }
    }
}());