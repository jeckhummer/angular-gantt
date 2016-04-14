function TreeNode(treeDataProvider){
    var _node = this;
    var _dataProvider = treeDataProvider;

    if(!_dataProvider){
        _node.order = 1;
    }else{
        _node.ID = _dataProvider.getID();
        _node.parentID = _dataProvider.getParentID();
        _node.order = _dataProvider.getOrder();
    }

    _node.childIDs = [];
    _node.deleted = false;
    _node.level = 1;
}