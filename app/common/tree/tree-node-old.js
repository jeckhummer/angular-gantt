function TreeNode(treeDataProvider){
    var _node = this;

    var _dataProvider = treeDataProvider;
    var _data = _dataProvider.getData();
    var _getID = _dataProvider.getID;
    var _getParentID = _dataProvider.getParentID;
    var _nodesDictionary;

    //var _selfLink = TreeNodeLink(_options.IDGetter(_data), _node);
    var _parent = null;//TreeNodeLink(_options.parentIDGetter(_data), null);
    var _children = null;

    //_node._selfLink = _selfLink;
    _node.delete = deleteNode;
    _node.getParent = getParent;
    _node.setParent = setParent;
    _node.getChildren = getChildren;
    _node.appendChild = appendChild;
    _node.prependChild = prependChild;
    //_node.insertChild = insertChild;
    _node.initReferences = initReferences;
    _node.order = _dataProvider.getOrder();
    _node._getID = _getID;
    _node._getParentID = _getParentID;

    function deleteNode(){

    }

    function getParent(){
        return _parent;
    }

    // тут будет сложная логика связанная с изменением порядка узлов (order)
    function setParent(node){
        _parent = node;
    }

    function getChildren(){
        return _children;
    }

    function appendChild(node){
        _children.appendChild(node);
    }

    function prependChild(node){
        _children.prependChild(node);
    }

    //function insertChild(node, index){
    //    _children.insertChild(node,index);
    //}

    function initReferences(nodesDictionary){
        _nodesDictionary = nodesDictionary;

        var parentID = _dataProvider.getParentID();
        var parentNode = _nodesDictionary[parentID].node;
        if (!parentNode) {
            throw `no [ID ${id}] node found!`;
        }
        setParent(parentNode);

        var ID = _dataProvider.getID();
        var unorderedChildren = _nodesDictionary[ID].children;
        _children = new TreeNodesOrderedList(unorderedChildren);
    }

    function _findNode(id){
        var node = _nodesDictionary[id];
        if (!node) {
            throw `no [ID ${id}] node found!`;
        }
        return node;
    }
}