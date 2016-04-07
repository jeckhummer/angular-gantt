(function () {
    angular.module('app-dev').config(RootScopeDecorator);

    function RootScopeDecorator($provide) {
        $provide.decorator("$rootScope", EventToConsoleReflector);
    }

    function EventToConsoleReflector($delegate) {
        var originalMethod = $delegate.$broadcast;
        var service = Object.assign($delegate, {
            $broadcast: function (name, args) {
                if(name[0] != '$') {
                    console.log(`[${name}] event raised with args:`, args);
                }
                return originalMethod.apply($delegate,[name, args]);
            }
        });
        return service;
    }
})();