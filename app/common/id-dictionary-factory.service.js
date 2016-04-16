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
        _self.remove = remove;
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

        function getRange(IDs){
            if(IDs !== undefined){
                var range = IDs.map((ID)=> get(ID));
                return range;
            }else{
                return _range;
            }
        }

        function remove(id){
            var object = get(id);
            var index = _range.indexOf(object);

            delete _dict[id];
            _range.splice(index, 1);
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
