function OrderDelegate(objectArray, orderSetter, orderGetter) {
    var self = this;

    var _orderedList = [];
    populate(objectArray);

    self.getOrderedList = getOrderedList;
    self.populate = populate;
    self.append = append;
    self.prepend = prepend;
    self.insert = insert;
    self.insertAfter = insertAfter;
    self.insertBefore = insertBefore;
    self.moveUp = moveUp;
    self.moveDown = moveDown;
    self.remove = remove;
    self.isFirst = isFirst;
    self.isLast = isLast;

    function getOrderedList(){
        return _orderedList;
    }

    function populate(arg){
        var objects = Array.isArray(arg) ? arg : [arg];
        _orderedList = _orderedList.concat(objects);

        _orderedList.sort(function (a, b) {
            return (orderGetter(a) - orderGetter(b));
         });
    }

    function append(object) {
        _orderedList.push(object);
        objectArray.push(object);
        _sync();
    }

    function prepend(object) {
        _orderedList.unshift(object);
        objectArray.push(object);
        _sync();
    }

    function insert(object, position) {
        _orderedList.splice(position, 0, object);
        objectArray.push(object);
        _sync();
    }

    function insertAfter(object, objectBefore) {
        var position = _getPosition(objectBefore) + 1;
        insert(object, position);
    }

    function insertBefore(object, objectAfter) {
        var position = _getPosition(objectAfter);
        insert(object, position);
    }

    function moveUp(object) {
        var currPosition = _getPosition(object);
        var nextPosition = currPosition + 1;
        if (_isValidPosition(nextPosition)) {
            _orderedList[currPosition] = _orderedList[nextPosition];
            _orderedList[nextPosition] = object;
        }
        _sync();
    }

    function moveDown(object) {
        var currPosition = _getPosition(object);
        var prevPosition = currPosition - 1;
        if (_isValidPosition(prevPosition)) {
            _orderedList[currPosition] = _orderedList[prevPosition];
            _orderedList[prevPosition] = object;
        }
        _sync();
    }

    function remove(object){
        var position = _getPosition(object);
        _orderedList.splice(position, 1);
        objectArray.splice(objectArray.indexOf(object), 1);
        _sync();
    }

    function isFirst(object){
        var position = _getPosition(object);
        return position == 0;
    }

    function isLast(object){
        var position = _getPosition(object);
        return position == _orderedList.length - 1;
    }

    function _sync() {
        _orderedList.forEach(function (object, position) {
            var order = _getOrder(position);
            orderSetter(object, order);
        });
    }

    function _isValidPosition(position) {
        return position < _orderedList.length && position > -1;
    }

    function _getPosition(object){
        var position = orderGetter(object) - 1;
        return position;
    }

    function _getOrder(position){
        var order = position + 1;
        return order;
    }
}
