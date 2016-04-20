'use strict';
(function () {
    angular.module('common.struct.order-delegate',[]).factory('OrderDelegateService', OrderDelegateService);

    function OrderDelegateService() {
        var service = {
            create: create
        };
        return service;

        function create(objectArray, orderSetter, orderGetter) {
            var orderDelegate = new OrderDelegate(objectArray, orderSetter, orderGetter);
            return orderDelegate;
        }
    }

    function OrderDelegate(objectArray, orderSetter, orderGetter) {
        var self = this;

        var _orderedList = objectArray.slice().sort(function (a, b) {
            return (orderGetter(a) - orderGetter(b));
        });

        self.append = append;
        self.prepend = prepend;
        self.insert = insert;
        self.insertAfter = insertAfter;
        self.insertBefore = insertBefore;
        self.moveUp = moveUp;
        self.moveDown = moveDown;
        self.remove = remove;
        self.getOrderedList = getOrderedList;

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
            var position = orderGetter(objectBefore) + 1;
            insert(object, position);
        }

        function insertBefore(object, objectAfter) {
            var position = orderGetter(objectAfter);
            insert(object, position);
        }

        function moveUp(object) {
            var curr = orderGetter(object);
            var next = curr + 1;
            if (_isValidPosition(next)) {
                _orderedList[curr] = _orderedList[next];
                _orderedList[next] = object;
            }
            _sync();
        }

        function moveDown(object) {
            var curr = orderGetter(object);
            var prev = curr - 1;
            if (_isValidPosition(prev)) {
                _orderedList[curr] = _orderedList[prev];
                _orderedList[prev] = object;
            }
            _sync();
        }

        function remove(object){
            var position = orderGetter(object);
            _orderedList.splice(position, 1);
            objectArray.splice(objectArray.indexOf(object), 1);
            _sync();
        }

        function _sync() {
            _orderedList.forEach(function (object, order) {
                orderSetter(object, order);
            });
        }

        function _isValidPosition(position) {
            return position < _orderedList.length && position > -1;
        }

        function getOrderedList(){
            return _orderedList;
        }
    }
})();
