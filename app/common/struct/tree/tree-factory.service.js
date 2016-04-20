'use strict';

(function () {
    angular.module('common.struct.tree').service('TreeFactoryService', TreeFactoryService);

    function TreeFactoryService(IDDictionaryFactoryService) {
        this.create = create;

        function create(data, treeDataAdapterFactory, desc) {
            var tree = new Tree(data, treeDataAdapterFactory, desc);
            return tree;
        }

        function Tree(data, treeDataAdapterFactory, desc) {
            var tree = this;

            var _data = data;
            var _rootNode;
            var _desc = desc;
            var _factory = treeDataAdapterFactory;
            var _dictionary;

            _init();

            tree.getAll = getAll;
            tree.get = get;
            tree.add = add;
            tree.update = update;
            tree.remove = remove;
            tree.isLastChild = isLastChild;
            tree.isFirstChild = isFirstChild;
            tree.isParent = isParent;

            function _init() {
                _rootNode = new TreeNode();

                _dictionary = IDDictionaryFactoryService.create((node)=>node.getID());
                _dictionary.add(_rootNode);

                _data.forEach(function (dataItem) {
                    var adapter = _factory.create(dataItem);
                    var node = new TreeNode(adapter);
                    _dictionary.add(node);
                });

                var allNodes = _dictionary.getRange();
                allNodes.forEach(function (node) {
                    if (node.getParentID() != null) {
                        get(node.getParentID()).childIDs.push(node.getID());
                        node.level = _calculateNestingLevel(node);
                    }
                });
            }

            function get(id) {
                return _dictionary.get(id);
            }

            function getAll(processor) {
                var _processor = processor || function (node) {
                        return node;
                    };

                var nodes = _recursiveWalk(_rootNode);
                return nodes;

                function _recursiveWalk(node) {
                    var nodes;
                    if (node.getID() != 0) {
                        nodes = [_processor(node)];
                    } else {
                        nodes = [];
                    }

                    var childNodes = [];

                    node.childIDs.forEach(function (childID) {
                        var childNode = get(childID);
                        childNodes.push(childNode);
                    });

                    childNodes.sort(function (a, b) {
                        return (a.getOrder() - b.getOrder()) * (desc ? -1 : 1);
                    });

                    childNodes.forEach(function (childNode) {
                        nodes = nodes.concat(_recursiveWalk(childNode));
                    });

                    return nodes;
                }
            }

            function add(data, prepend) {
                var node = _createNode(data);

                if (_validateNode(node)) {
                    var parentNode = get(node.getParentID());
                    _dictionary.add(node);

                    parentNode.childIDs.push(node.getID());
                    node.level = _calculateNestingLevel(node);

                    var siblings = _getSiblingNodes(node.getID());
                    if (prepend) {
                        node.setOrder(1);
                        siblings.forEach((siblingNode) => siblingNode.setOrder(siblingNode.getOrder() + 1));
                    } else {
                        var order = siblings.length + 1;
                        node.setOrder(order);
                    }

                    return node;
                } else {
                    console.log('add tree node error: parent node doesn\'t exist!');
                }
            }

            function update(data) {
                var node = _createNode(data);
                var id = node.getID();

                if (_validateNode(node)) {
                    remove(node.getID());
                    data.id
                    add(data);
                }
            }

            function remove(id){
                var node = _dictionary.get(id);
                var parentID = node.getParentID();

                _getSiblingNodes(id).forEach(function (sibling) {
                    if(sibling.getOrder() > node.getOrder()){
                        sibling.decOrder();
                    }
                });

                if (parentID != null){
                    var parentNode = _dictionary.get(parentID);
                    var index = parentNode.childIDs.indexOf(id);
                    parentNode.childIDs.splice(index ,1);
                }

                _recurRemove(id);
            }

            function isLastChild(id) {
                var node = get(id);
                var order = node.getOrder();
                var siblings = _getSiblingNodes(id);
                var _isLastChild = order == siblings.length + 1;
                return _isLastChild;
            }

            function isFirstChild(id) {
                var node = get(id);
                var order = node.getOrder();
                var _isFirstChild = order == 1;
                return _isFirstChild;
            }

            function isParent(id) {
                var children = _getChildrenNodes(id);
                return id != null && children.length > 0;
            }

            function _recurRemove(id){
                _getChildrenNodes(id).forEach(function (node) {
                    _recurRemove(node.getID());
                });

                _dictionary.remove(id);
            }

            function _validateNode(node) {
                var parentNode = get(node.getParentID());
                return parentNode !== undefined;
            }

            function _createNode(data) {
                var provider = _factory.create(data);
                var node = new TreeNode(provider);
                return node;
            }

            function _getSiblingNodes(id, includeItself) {
                var node = get(id);
                var parentID = node.getParentID();
                if (parentID !== null) {
                    var siblings = _getChildrenNodes(parentID);
                    if (!includeItself) {
                        siblings = siblings.filter(function (sibling) {
                            var notItself = sibling.getID() != id;
                            return notItself;
                        });
                    }
                    return siblings;
                } else {
                    return node;
                }
            }

            function _getChildrenNodes(id) {
                var node = get(id);
                return _dictionary.getRange(node.childIDs);
            }

            function _calculateNestingLevel(node) {
                var level = 0;
                var _node = node;

                while (_node.getParentID() != null) {
                    level++;
                    _node = _dictionary.get(_node.getParentID());
                }
                return level;
            }
        }
    }
}());