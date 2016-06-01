'use strict';
(function () {
    angular.module('dev.common.delayed-response', [])
        .factory('DelayedResponseFactoryService', DelayedResponseFactoryService);

    function DelayedResponseFactoryService($timeout, $q) {
        var service = {
            create: create
        };

        return service;

        function create(responseData, options) {
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