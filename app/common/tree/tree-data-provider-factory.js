function TreeDataProviderFactory(IDGetter, parentIDGetter, orderGetter){
    this.create = create;
    var _IDGetter = IDGetter;
    var _parentIDGetter = parentIDGetter;
    var _orderGetter = orderGetter;

    function create(data){
        var provider = new TreeDataProvider(data, _IDGetter, _parentIDGetter, _orderGetter);
        return provider;
    }
}