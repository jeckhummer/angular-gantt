function TreeNodesOrderedList(nodes){
    var _list = this;
    var _storage = [];

    _list.appendNode = appendNode;
    _list.prependNode = prependNode;
    _list.insertNode = insertNode;
    _list.deleteNode = deleteNode;
    _list.getList = getList;

    _storage = nodes.sort(function (a, b) {
        return b.order - a.order;
    });

    function getList(){
        return _storage;
    }

    function appendNode(node){
        insertNode(node, _storage.length);
    }

    function prependNode(node){
        insertNode(node, 0);
    }

    function insertNode(node, index){
        if(index > _storage.length || index < 0){
            throw "Storage index out of range!";
        }else{
            _storage = _storage.splice(index, 0, node);
            node.order = index;

            for(var i = index + 1; i < _storage.length; i++){
                var node = _storage[i];
                node.order++;
            }
        }
    }

    function deleteNode(index){
        if(index >= _storage.length || index < 0){
            throw "Storage index out of range!";
        }else{
            _storage = _storage.splice(index, 1);

            for(var i = index + 1; i < _storage.length; i++){
                var node = _storage[i];
                node.order--;
            }
        }
    }
}
