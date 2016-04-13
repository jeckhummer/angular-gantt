function Tree(data, treeDataProviderFactory){
    var tree = this;

    var _data = data;
    var _rootNode;
    var _nodes = [];
    var _factory = treeDataProviderFactory;
    var _dictionary;

    _init();

    tree.getAll = getAll;

    function _init(){
        _rootNode = new TreeNode();
        _rootNode.ID = 0;
        _rootNode.parentID = null;

        _dictionary = new TreeNodesDictionary();
        _dictionary.addNode(_rootNode);

        _data.forEach(function (dataItem) {
            var provider = _factory.create(dataItem);
            var node = new TreeNode(provider);
            _nodes.push(node);
            _dictionary.addNode(node);
        });

        _nodes.forEach(function (node) {
            _dictionary.getNode(node.parentID).childIDs.push(node.ID);
        });

        console.log(_nodes);
    }

    function getAll(){
        var nodes = _recursiveWalk(_rootNode);
        return nodes;

        function _recursiveWalk(node){
            var nodes = [node];
            node.childIDs.forEach(function (childID) {
                var childNode = _dictionary.getNode(childID);
                nodes.concat(_recursiveWalk(childNode));
            });
            return nodes;
        }
    }
}