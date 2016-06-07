function Dictionary(objects, keysProvider, valueProvider){
    var _self = this;
    var _keysProvider = keysProvider || _defaultKeysProvider;
    var _valueProvider = valueProvider || _defaultValueProvider;
    var _dictionary;
    var _chainedDictionary;
    var _values;
    var _keys;

    _self.add = add;
    _self.addRange = addRange;
    _self.get = get;
    _self.remove = remove;
    _self.getValues = getValues;
    _self.getKeys = getKeys;
    _self.reset= reset;
    _self.processRange = processRange;
    _self.getSize = getSize;
    _self.isEmpty = isEmpty;
    _self.chainTo = chainTo;

    _init();

    function _init(){
        reset();
        addRange(objects);
    }

    function reset(){
        _chainedDictionary = null;
        _dictionary = {};
        _values = [];
        _keys = [];
    }

    function add(object){
        var keys = _keysProvider(object);
        if(!Array.isArray(keys)){
            keys = [keys];
        }

        keys.forEach(function (key) {
            var value = _valueProvider(object, key);
            key = key.toString();
            if(_dictionary[key]){
                _dictionary[key].push(value);
            }else{
                _dictionary[key] = [value];
                _keys.push(key);
            }
            _values.push(value);
        });
    }

    function addRange(objects){
        objects.forEach(function (object) {
            add(object);
        });
    }

    function get(key){
        var values = _dictionary[key];

        if(_chainedDictionary){
            var keys = values.slice();
            values = [];

            keys.forEach(function (key) {
                values = values.concat(_chainedDictionary.get(key));
            });
        }

        return values;
    }

    function getValues(){
        return _values;
    }

    function getKeys() {
        return _keys;
    }

    function remove(key){
        var object = get(key);
        var index = _values.indexOf(object);

        delete _dictionary[key];
        _values.splice(index, 1);
    }

    function processRange(processor){
        return _values.map(processor);
    }

    // readonly
    function getSize(){
        return _values.length;
    }

    // readonly
    function isEmpty(){
        return getSize() == 0;
    }

    function chainTo(dictionary) {
        _chainedDictionary = dictionary;
        return _self;
    }

    function _defaultKeysProvider(object){
        return object.id;
    }
    function _defaultValueProvider(object){
        return object;
    }
}
