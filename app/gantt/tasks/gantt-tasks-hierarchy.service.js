(function () {
    angular.module('gantt').factory('GanttTasksHierarchyService', GanttTasksHierarchyService);

    function GanttTasksHierarchyService(GanttTasksDictionaryService, TreeFactoryService, $rootScope) {
        var _tree;

        var service = {
            get: get,
            getAll: getAll,
            isFirstChild: isFirstChild,
            isLastChild: isLastChild,
            isParent: isParent
        };

        $rootScope.$on('tasks-changed', _init);
        _init();
        return service;

        function _init(){
            var tasks = GanttTasksDictionaryService.getRange();
            _tree = new TreeFactoryService.create(tasks, new _DataProviderFactoryService);
        }

        function _DataProviderFactoryService(){
            var service = new TreeDataProviderFactory(IDGetter, parentIDGetter, orderGetter);
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

        function getAll(processor){
            var tasks = _tree.getAll(processor);
            return tasks;
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