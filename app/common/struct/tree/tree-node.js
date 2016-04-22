function TreeNode(data, IDGetter, IDSetter, parentIDGetter, parentIDSetter, orderGetter, orderSetter){
    var _node = this;
    var _order = 1;
    var _ID = 0;
    var _parentID = null;
    var _children = new OrderDelegate([],
        function (node, val) { node.setOrder(val); },
        function (node) { return node.getOrder(); }
    );

    _node.level = 0;

    _node.getOrder = getOrder;
    _node.setOrder = setOrder;
    _node.getID = getID;
    _node.setID = setID;
    _node.getParentID = getParentID;
    _node.setParentID = setParentID;

    _node.getChildren = getChildren;
    _node.populateChildren = populateChildren;
    _node.insertChild = insertChild;
    _node.appendChild = appendChild;
    _node.prependChild = prependChild;
    _node.insertChildAfter = insertChildAfter;
    _node.insertChildBefore = insertChildBefore;
    _node.removeChild = removeChild;
    _node.isFirstChild = isFirstChild;
    _node.isLastChild = isLastChild;

    function getOrder() {
        if(orderGetter && data !== {}){
            return orderGetter(data);
        }else{
            return _order;
        }
    }
    function setOrder(val) {
        if(orderGetter){
            orderSetter(data, val);
        }else{
            _order = val;
        }
    }

    function getID() {
        if(IDGetter){
            return IDGetter(data);
        }else{
            return _ID;
        }
    }
    function setID(val) {
        if(IDSetter){
            IDSetter(data, val);
        }else{
            _ID = val;
        }
    }

    function getParentID () {
        if(parentIDGetter){
            return parentIDGetter(data);
        }else{
            return _parentID;
        }
    }
    function setParentID (val) {
        if(parentIDSetter){
            parentIDSetter(data, val);
        }else{
            _parentID = val;
        }
    }


    function getChildren(){
        return _children.getOrderedList();
    }

    function populateChildren(nodes){
        _children.populate(nodes);
    }

    function insertChild(node, order){
        var position = order - 1;
        _children.insert(node, position);
    }

    function appendChild(node){
        _children.append(node);
    }

    function prependChild(node){
        _children.prepend(node);
    }

    function insertChildAfter(node, nodeBefore){
        _children.insertAfter(node, nodeBefore);
    }

    function insertChildBefore(node, nodeAfter){
        _children.insertBefore(node, nodeAfter);
    }

    function removeChild(node){
        _children.remove(node);
    }

    function isFirstChild(node){
        return _children.isFirst(node);
    }

    function isLastChild(node){
        return _children.isLast(node);
    }
}