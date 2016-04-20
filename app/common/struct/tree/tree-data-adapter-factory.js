function TreeDataAdapterFactory(IDAccessor, parentIDAccessor, orderAccessor){
    this.create = create;
    var _IDAccessor = IDAccessor;
    var _parentIDAccessor = parentIDAccessor;
    var _orderAccessor = orderAccessor;

    function create(data){
        var provider = new TreeDataAdapter(data);
        return provider;
    }

    function TreeDataAdapter(data){
        var _data = data;

        return {
            getID: getID,
            getParentID: getParentID,
            getOrder: getOrder,
            setID: setID,
            setParentID: setParentID,
            setOrder: setOrder,
            getData: getData
        };

        function getID(){
            return _IDAccessor(_data);
        }
        function setID(val){
            _IDAccessor(_data, val);
        }

        function getParentID(){
            return _parentIDAccessor(_data);
        }
        function setParentID(val){
            _parentIDAccessor(_data, val);
        }

        function getOrder(){
            return _orderAccessor(_data);
        }
        function setOrder(val){
            orderAccessor(_data, val);
        }

        function getData(){
            return _data;
        }
    }
}