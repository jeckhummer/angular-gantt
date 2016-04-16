(function () {
    angular.module('gantt').factory('GanttTasksHierarchyService', GanttTasksHierarchyService);

    function GanttTasksHierarchyService(GanttTasksDictionaryService, TreeFactoryService, $rootScope) {
        var _tree;

        var service = {
            get: get,
            getAllTasks: getAllTasks,
            getAllNodes: getAllNodes,
            isFirstChild: isFirstChild,
            isLastChild: isLastChild,
            isParent: isParent
        };

        $rootScope.$on('tasks-changed', _init);
        _init();
        return service;

        function _init(){
            var tasks = GanttTasksDictionaryService.getRange();
            _tree = new TreeFactoryService.create(tasks, new _DataAdapterFactoryService());
        }

        function _DataAdapterFactoryService(){
            var service = new TreeDataAdapterFactory(IDGetter, parentIDGetter, orderGetter);
            return service;

            function IDGetter(data){
                return data.id;
            }

            function parentIDGetter(data){
                return data.parentID;
            }

            function orderGetter(data){
                return data.order;
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
    }
})();