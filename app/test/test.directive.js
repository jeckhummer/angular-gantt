angular.module('test').directive('test', TestDirective);

function TestDirective(){
    var directive = {
        restrict: 'E',
        template:'test-directive',
        scope: {},
        link: ($scope, element)=>{ }
    };
    return directive;
}