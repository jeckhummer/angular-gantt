function Tree(data, IDGetter, IDSetter, parentIDGetter, parentIDSetter, orderGetter, orderSetter, desc) {
    var tree = this;

    var _data = data;
    var _rootNode;
    var _desc = desc;
    var _dictionary;

    _init();

    tree.getAll = getAll;
    tree.get = get;
    tree.insert = insert;
    tree.insertAfter = insertAfter;
    tree.insertBefore = insertBefore;
    tree.prepend = prepend;
    tree.append = append;
    //tree.update = update;
    tree.remove = remove;
    tree.move = move;
    tree.isLastChild = isLastChild;
    tree.isFirstChild = isFirstChild;
    tree.isParent = isParent;

    function _init() {
        var _rootScopeData = {};
        IDSetter(_rootScopeData, 0);
        parentIDSetter(_rootScopeData, null);
        orderSetter(_rootScopeData, 1);

        _rootNode =_createNode(_rootScopeData);

        _dictionary = new IDDictionary((node)=>node.getID());
        _dictionary.add(_rootNode);

        _data.forEach(function (dataItem) {
            var node = _createNode(dataItem);
            _dictionary.add(node);
        });

        var allNodes = _dictionary.getRange();
        allNodes.forEach(function (node) {
            var parentID = node.getParentID();
            if (parentID != null) {
                var parentNode = get(parentID);
                parentNode.populateChildren(node);

                _setNestingLevel(node);
            }
        });
    }

    function get(id) {
        return _dictionary.get(id);
    }

    function getAll(processor) {
        var _processor = processor || function (node) { return node; };

        var nodes = _recursiveWalk(_rootNode);
        return nodes;

        function _recursiveWalk(node) {
            var nodes;
            if (node.getID() != 0) {
                nodes = [_processor(node)];
            } else {
                nodes = [];
            }

            var childNodes = node.getChildren();

            childNodes.forEach(function (childNode) {
                nodes = nodes.concat(_recursiveWalk(childNode));
            });

            return nodes;
        }
    }

    function insert(data, parentID, order) {
        var node = _createNode(data);

        if (_validateNode(node)) {
            _dictionary.add(node);

            var parentNode = get(parentID);
            parentNode.insertChild(node, order);

            _setNestingLevel(node);

            return node;
        } else {
            console.log('add tree node error: parent node doesn\'t exist!');
        }
    }

    function insertAfter(data, nodeBeforeID) {
        var node = _createNode(data);

        if (_validateNode(node)) {
            _dictionary.add(node);

            var nodeBefore = get(nodeBeforeID);
            var parentID = nodeBefore.getParentID();
            var parentNode = get(parentID);

            parentNode.insertChildAfter(node, nodeBefore);

            _setNestingLevel(node);

            return node;
        } else {
            console.log('add tree node error: parent node doesn\'t exist!');
        }
    }

    function insertBefore(data, nodeAfterID) {
        var node = _createNode(data);

        if (_validateNode(node)) {
            _dictionary.add(node);

            var nodeAfter = get(nodeAfterID);
            var parentID = nodeAfter.getParentID();
            var parentNode = get(parentID);

            parentNode.insertChildBefore(node, nodeAfter);

            _setNestingLevel(node);

            return node;
        } else {
            console.log('add tree node error: parent node doesn\'t exist!');
        }
    }

    function prepend(data, parentID) {
        var node = _createNode(data);

        if (_validateNode(node)) {
            _dictionary.add(node);

            var parentNode = get(parentID);
            parentNode.prependChild(node);

            _setNestingLevel(node);

            return node;
        } else {
            console.log('add tree node error: parent node doesn\'t exist!');
        }
    }

    function append(data, parentID) {
        var node = _createNode(data);

        if (_validateNode(node)) {
            _dictionary.add(node);

            var parentNode = get(parentID);
            parentNode.appendChild(node);

            _setNestingLevel(node);

            return node;
        } else {
            console.log('add tree node error: parent node doesn\'t exist!');
        }
    }

    //function update(data, ID) {
    //    var node = _createNode(data);
    //
    //    if (_validateNode(node)) {
    //        var order = node.getOrder();
    //        var parentID = node.getParentID();
    //
    //        remove(ID);
    //        console.log(_dictionary.get(ID));
    //        insert(data, parentID, order);
    //    }
    //}

    function move(ID, newParentID, prepend){
        var node = get(ID);
        var oldParentID = node.getParentID();
        var oldParentNode = get(oldParentID);
        var newParentNode = get(newParentID);

        node.setParentID(newParentID);

        oldParentNode.removeChild(node);
        if(prepend){
            newParentNode.prependChild(node);
        }else{
            newParentNode.appendChild(node);
        }
    }

    function remove(ID){
        var node = get(ID);
        var parentID = node.getParentID();
        var parentNode = get(parentID);

        parentNode.removeChild(node);

        _recurRemove(node);
    }

    function isFirstChild(ID) {
        var node = get(ID);
        var parentID = node.getParentID();
        var parentNode = get(parentID);

        return parentNode.isFirstChild(node);
    }

    function isLastChild(ID) {
        var node = get(ID);
        var parentID = node.getParentID();
        var parentNode = get(parentID);

        return parentNode.isLastChild(node);
    }

    function isParent(ID) {
        var node = get(ID);
        var children = node.getChildren();

        return ID != null && children.length > 0;
    }

    function _recurRemove(node){
        var ID = node.getID();
        var children = node.getChildren();

        children.forEach(function (childNode) {
            _recurRemove(childNode);
        });

        _dictionary.remove(ID);
    }

    function _validateNode(node) {
        var parentNode = get(node.getParentID());
        return parentNode !== undefined;
    }

    function _createNode(data) {
        var node = new TreeNode(data, IDGetter, IDSetter, parentIDGetter, parentIDSetter, orderGetter, orderSetter);
        return node;
    }

    function _setNestingLevel(node) {
        var parentID = node.getParentID();
        var parentNode = get(parentID);
        if(parentNode){
            node.level = parentNode.level + 1;
        }

        var children = node.getChildren();
        children.forEach(function (child) {
            _setNestingLevel(child);
        });
    }
}
