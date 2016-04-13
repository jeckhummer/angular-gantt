function TreeNodesDictionary(){
    var self = this;
    var _dict = {};
    var _nodes = [];

    self.addNode = addNode;
    self.getNode = getNode;

    function addNode(node){
        _dict[node.ID] = node;
        _nodes.push(node);
    }

    function getNode(id){
        return _dict[id];
    }
}