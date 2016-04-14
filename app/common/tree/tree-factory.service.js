(function () {
    'use strict';
    angular.module('common').service('TreeFactoryService', TreeFactoryService);

    function TreeFactoryService(IDDictionaryFactoryService){
        this.create = create;

        function create(data, treeDataProviderFactory, desc){
            var tree = new Tree(data, treeDataProviderFactory, desc);
            return tree;
        }

        function Tree(data, treeDataProviderFactory, desc){
            var tree = this;

            var _data = data;
            var _rootNode;
            var _desc = desc;
            var _factory = treeDataProviderFactory;
            var _dictionary;

            _init();

            tree.getAll = getAll;

            function _init(){
                _rootNode = new TreeNode();
                _rootNode.ID = 0;
                _rootNode.parentID = null;

                _dictionary = IDDictionaryFactoryService.create(NodeIDProvider);
                _dictionary.add(_rootNode);

                _data.forEach(function (dataItem) {
                    var provider = _factory.create(dataItem);
                    var node = new TreeNode(provider);
                    _dictionary.add(node);
                });

                var allNodes = _dictionary.getRange();
                allNodes.forEach(function (node) {
                    if(node.parentID != null){
                        _dictionary.get(node.parentID).childIDs.push(node.ID);
                        node.level = calculateNestingLevel(node);
                    }
                });

                function calculateNestingLevel(node){
                    var level = 0;
                    var _node = node;

                    while(_node.parentID != null){
                        level++;
                        _node = _dictionary.get(_node.parentID);
                    }
                    return level;
                }
            }

            function getAll(processor){
                var _processor = processor || function (node) { return node; };

                var nodes = _recursiveWalk(_rootNode);
                return nodes;

                function _recursiveWalk(node){
                    var nodes;
                    if(node.ID != 0) {
                        nodes = [_processor(node)];
                    }else{
                        nodes = [];
                    }

                    var childNodes = [];

                    node.childIDs.forEach(function (childID) {
                        var childNode = _dictionary.get(childID);
                        childNodes.push(childNode);
                    });

                    childNodes.sort(function (a,b) {
                        return (a.order - b.order) * (desc ? -1 : 1);
                    });

                    childNodes.forEach(function (childNode) {
                        nodes = nodes.concat(_recursiveWalk(childNode));
                    });

                    return nodes;
                }
            }

            function NodeIDProvider(node){
                return node.ID;
            }
        }
    }
}());