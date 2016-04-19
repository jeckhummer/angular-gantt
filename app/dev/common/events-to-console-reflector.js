(function () {
    angular.module('dev.common.events-to-console-reflector',[]).config(RootScopeDecorator);

    function RootScopeDecorator($provide) {
        $provide.decorator("$rootScope", EventToConsoleReflector);
    }

    function EventToConsoleReflector($delegate) {
        var originalMethod = $delegate.$broadcast;
        var filters = ['boundaries-changed'];

        var service = Object.assign($delegate, {
            $broadcast: function (name, args) {
                if(name[0] != '$' && filters.indexOf(name) == -1) {
                    console.log(`[${name}] event raised with args:`, args);
                }
                return originalMethod.apply($delegate,[name, args]);
            }
        });
        return service;
    }
})();