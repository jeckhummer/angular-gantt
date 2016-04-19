(function () {
    angular.module('common.locale.url').component('urlLocaleInclude', {
        template: '<ng-include src="$ctrl.url"></ng-include>',
        controller: URLLocaleController,
        bindings: {
            alias: '@'
        }
    });

    function URLLocaleController(URLLocaleService){
        var ctrl = this;

        ctrl.$onInit = init;

        function init(){
            ctrl.url = URLLocaleService.getURL(ctrl.alias);
        }
    }
}());