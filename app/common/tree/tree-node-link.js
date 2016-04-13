function TreeNodeLink(ID, node){
    var _ID = ID;
    var _node = node;

    var link = {
        get: get,
        set: set
    };
    return link;

    function get(){
        var data = {
            ID: _ID,
            node: _node
        };
        return data;
    }

    function set(link){
        var data = link.get();
        _ID = data.ID;
        _node = data.node;
    }
}