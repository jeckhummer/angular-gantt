(function () {
    angular.module('gantt').factory('GanttTasksHierarchyService', GanttTasksHierarchyService);

    function GanttTasksHierarchyService(GanttTasksDictionaryService, $rootScope) {
        var _tree;

        var service = {
            get: get,
            getAllTasks: getAllTasks,
            getAllNodes: getAllNodes,
            isFirstChild: isFirstChild,
            isLastChild: isLastChild,
            isParent: isParent,
            isChildOf: isChildOf
        };

        $rootScope.$on('tasks-changed', _init);
        _init();
        return service;

        function _init(){
            var tasks = GanttTasksDictionaryService.getRange();
            _tree = new Tree(tasks, IDGetter, IDSetter, parentIDGetter, parentIDSetter, orderGetter, orderSetter);

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

        function get(id){
            var task = _tree.get(id);
            return task;
        }

        function getAllTasks(){
            var tasks = _tree.getAll((node) => GanttTasksDictionaryService.get(node.getID()));
            return tasks;
        }

        function getAllNodes(){
            var nodes = _tree.getAll();
            return nodes;
        }

        function isFirstChild(id){
            return _tree.isFirstChild(id);
        }

        function isLastChild(id){
            return _tree.isLastChild(id);
        }

        function isParent(id){
            return _tree.isParent(id);
        }

        function isChildOf(id, suspectParentID){
            var node = get(id);
            var parentNode = get(node.getParentID());
            var parentID = parentNode.getID();
            var isChild = false;

            while(parentID !== null){
                if(parentID == suspectParentID){
                    isChild = true;
                    break;
                }
                parentNode = get(parentID);
                parentID = parentNode.getParentID();
            }

            return isChild;
        }
    }
})();