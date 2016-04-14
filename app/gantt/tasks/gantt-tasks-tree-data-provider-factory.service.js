(function() {
    angular.module('gantt')
        .factory('GanttTasksTreeDataProviderFactoryService', GanttTasksTreeDataProviderFactoryService);

    function GanttTasksTreeDataProviderFactoryService(){
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
})();
