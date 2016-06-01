'use strict';
(function () {
    angular.module('dev.common.delay-wrapper', []).service('DelayWrapperFactoryService', DelayWrapperFactoryService);

    function DelayWrapperFactoryService($timeout) {
        var service = this;
        service.create = function create(action, delay, delayDisabled) {
            var _delay = !!delayDisabled ? 0 : delay;
            var promise = _createPromise(action, _delay);
            var wrapper = function(){
                return promise;
            };

            return wrapper;
        }

        function _createPromise(action, delay) {
            return $timeout(action, delay);
        }
    }
})();