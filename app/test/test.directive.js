angular.module('test').directive('test', TestDirective);

function TestDirective(){
    var directive = {
        restrict: 'E',
        template:'test-directive',
        scope: {}
    };
    return directive;
}