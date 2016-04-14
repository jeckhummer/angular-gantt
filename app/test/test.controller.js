angular.module('test').controller('testController', function(TreeFactoryService, GanttTasksTestData){
    var self = this;

    var tasks = GanttTasksTestData.tasks;
    var treeDataProviderFactory = new TreeDataProviderFactory(IDGetter, parentIDGetter, orderGetter);
    var tree = TreeFactoryService.create(tasks, treeDataProviderFactory);

    self.nodes = tree.getAll(function (node) {
        return Object.assign(node, {test: 'test'});
    });

    function IDGetter(data){
        return data.id;
    }

    function parentIDGetter(data){
        return data.parentID;
    }

    function orderGetter(data){
        return data.order;
    }
});