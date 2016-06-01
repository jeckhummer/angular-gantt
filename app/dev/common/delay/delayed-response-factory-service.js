'use strict';
(function () {
    angular.module('dev.common.delayed-response', [])
        .service('DelayedResponseFactoryService', DelayedResponseFactoryService);

    function DelayedResponseFactoryService($timeout, $q) {
        var service = this;
        service.create = function create(responseData, options) {
            var responsePromise;
            if(!!options.getIsErrorResponse()){
                responsePromise = $q.reject(responseData.getErrorData());
            }else{
                responsePromise = $q.resolve(responseData.getSuccessData());
            }

            var wrapper = function(){
                var timeout = $timeout(function(){
                    return responsePromise;
                }, options.getDelay());
                return timeout;
            };

            return wrapper;
        }
    }
})();