(function () {
    angular.module('common').factory('IDDictionaryFactoryService', IDDictionaryFactoryService);

    function IDDictionaryFactoryService(){
        var service = {
            create: create
        };

        return service;

        function create(IDProvider){
            var dict = new IDDictionary(IDProvider);
            return dict;
        }
    }

    function IDDictionary(IDProvider){
        var _self = this;
        var _IDProvider = IDProvider;
        var _dict;
        var _range;

        _self.add = add;
        _self.addRange = addRange;
        _self.get = get;
        _self.getRange = getRange;
        _self.reset= reset;
        _self.processRange = processRange;
        _self.getSize = getSize;
        _self.isEmpty = isEmpty;

        reset();

        function reset(){
            _dict = {};
            _range = [];
        }

        function add(object){
            var ID = _IDProvider(object);
            _dict[ID] = object;
            _range.push(object);
        }

        function addRange(objects){
            objects.forEach(function (object) {
                add(object);
            });
        }

        function get(id){
            return _dict[id];
        }

        function getRange(){
            return _range;
        }

        function processRange(processor){
            return _range.map(processor);
        }

        // readonly
        function getSize(){
            return _range.length;
        }

        // readonly
        function isEmpty(){
            return getSize() == 0;
        }
    }
})();
