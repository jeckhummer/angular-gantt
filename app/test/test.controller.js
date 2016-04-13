angular.module('test').controller('testController', function(TreeFactory, GanttTasksTestData){
    var self = this;

    var tasks = GanttTasksTestData.tasks;
    var treeDataProviderFactory = new TreeDataProviderFactory(IDGetter, parentIDGetter, orderGetter);
    var tree = TreeFactory.create(tasks, treeDataProviderFactory);

    self.nodes = tree.getAll();

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

// depth, preCalculated ChildList, array push auto order calculation
