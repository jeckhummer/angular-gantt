function TreeNode(treeDataAdapter){
    var _node = this;
    var _dataAdapter = treeDataAdapter ? treeDataAdapter : new TreeDataAdapterStub();

    _node.getOrder = _dataAdapter.getOrder;
    _node.getID = _dataAdapter.getID;
    _node.getParentID = _dataAdapter.getParentID;

    _node.setOrder = _dataAdapter.setOrder;
    _node.setID = _dataAdapter.setID;
    _node.setParentID = _dataAdapter.setParentID;

    _node.childIDs = [];
    _node.deleted = false;
    _node.level = 1;
}

function TreeDataAdapterStub(data){
    var _data = data;
    var _ID = 0, _order = 1, _parentID = null;

    return {
        getID: getID,
        setID: setID,

        getOrder: getOrder,
        setOrder: setOrder,
        incOrder: incOrder,
        decOrder: decOrder,

        getParentID: getParentID,
        setParentID: setParentID,

        getData: getData
    };

    function getID(){
        return _ID;
    }
    function setID(val){
        _ID = val;
    }

    function getParentID(){
        return _parentID;
    }
    function setParentID(val){
        _parentID = val;
    }

    function getOrder(){
        return _order;
    }
    function setOrder(val){
        _order= val;
    }
    function incOrder(){
        setOrder(getOrder() + 1);
    }
    function decOrder(){
        setOrder(getOrder() - 1);
    }

    function getData(){
        return _data;
    }
}
