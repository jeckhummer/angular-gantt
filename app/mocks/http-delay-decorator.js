(function () {
    angular.module('app-dev').config(HttpDelayDecorator);

    function HttpDelayDecorator($provide) {
        $provide.decorator("HttpService", DelayedHttpService);
    }

    function DelayedHttpService($delegate, $q) {
        var service = {
            getResource: getDelayedFunction($delegate.getResource, 1),
            postResource: getDelayedFunction($delegate.postResource, 2),
            getResourceUrl: $delegate.getResourceUrl
        };
        return service;

        function getDelayedFunction(func, delayArgumentIndex) {
            var delayedFunc = function () {
                var args = arguments;
                var delay = args[delayArgumentIndex] || 0;
                var promise = $q(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, delay);
                }).then(function () {
                    return func.apply(service, args);
                });
                return promise;
            };
            return delayedFunc;
        }
    }
})();
