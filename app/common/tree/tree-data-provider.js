function TreeDataProvider(data, IDGetter, parentIDGetter, orderGetter){
    var _data = data;
    var _IDGetter = IDGetter;
    var _parentIDGetter = parentIDGetter;
    var _orderGetter = orderGetter;

    return {
        getID: getID,
        getParentID: getParentID,
        getOrder: getOrder,
        getData: getData
    };

    function getID(){
        return _IDGetter(_data);
    }

    function getParentID(){
        return _parentIDGetter(_data);
    }

    function getOrder(){
        return _orderGetter(_data);
    }

    function getData(){
        return _data;
    }
}