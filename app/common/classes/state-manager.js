function StateManager(prefix, publishMethod, separator) {
    var service = this;
    var _state = {};
    var _separator = separator || '.';

    service.setState = setState;
    service.getState = getState;

    function setState(state) {
        var stateParts = state.split(_separator);
        var typeParts = stateParts.slice(0, stateParts.length - 1);
        var value = stateParts[stateParts.length - 1];

        var _stateLevel = _state;

        for(var i = 0; i< typeParts.length; i ++){
            var typePart = typeParts[i];

            if(i == typeParts.length - 1){
                _stateLevel[typePart] = value;
            }else{
                _stateLevel[typePart] = {};
                _stateLevel = _stateLevel[typePart];
            }
        }

        // _state[type] = value;

        _publish('$state-change');
        _publish(state);
    }

    function getState() {
        return _state;
    }

    function _publish(suffix){
        var message = prefix + separator + suffix;
        publishMethod(message);
    }
}