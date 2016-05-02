(function () {
    angular.module('dev.gantt.mocks').config(GanttTaskDataProviderServiceMockConfig);

    function GanttTaskDataProviderServiceMockConfig($provide) {
        $provide.decorator("GanttTasksDataProviderService", GanttTaskDataProviderServiceMock);
    }

    function GanttTaskDataProviderServiceMock(GanttTasksTestData, $timeout, $q) {
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
        var _DELAY_ENABLED = false;

        var _DELAYS = {
            getTasks: 7000,
            addTask: 3000,
            updateTask: 2000,
            deleteTask: 2000
        };

        _init(GanttTasksTestData.tasks);
        return service;

        function _init(tasksData) {
            _dictionary = new IDDictionary((task)=>task.id);
            _dictionary.addRange(tasksData);

            _tree = new Tree(tasksData, IDGetter, IDSetter, parentIDGetter, parentIDSetter, orderGetter, orderSetter);

            function IDGetter(data){
                return data.id;
            }

            function parentIDGetter(data){
                return data.parentID;
            }

            function orderGetter(data){
                return data.order;
            }

            function IDSetter(data, val){
                data.id = val;
            }

            function parentIDSetter(data, val){
                data.parentID = val;
            }

            function orderSetter(data, val){
                data.order = val;
            }
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

            var parentID = taskData.parentID;
            var node = prepend ? _tree.prepend(taskData, parentID) : _tree.append(taskData, parentID);
            if (node) {
                _dictionary.add(taskData);
                return getTasks();
            } else {
                return _getPromise('getTasks', function () {
                    return $q.reject('parent task doesn\'t exist!');
                });
            }
        }

        function updateTask(taskData, prepend) {
            var promise = _getPromise('updateTask', function () {
                var id = taskData.id;
                var parentID = taskData.parentID;
                var oldTaskData = _dictionary.get(id);
                var oldParentID = oldTaskData.parentID;
                var parentIDChanged = parentID != oldParentID;

                _dictionary.remove(id);
                _dictionary.add(taskData);

                if(parentIDChanged) {
                    var newParentID = parentID;
                    _tree.move(id, newParentID, prepend);
                    _dictionary.get(id).order = _tree.get(id).getOrder();
                }

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

        function _getDelay(actionName) {
            return _DELAY_ENABLED ? _DELAYS[actionName] : 0;
        }

        function _getPromise(actionName, action) {
            var delay = _getDelay(actionName);
            return $timeout(action, delay);
        }

        function _parentIDChanged(taskData){
            var id = taskData.id;
            var parentID = taskData.parentID;
            var oldTaskData = _dictionary.get(id);
            var oldParentID = oldTaskData.parentID;
            var parentIDChanged = parentID != oldParentID;

            return parentIDChanged;
        }
    }
}());