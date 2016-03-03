angular.module('test').directive('test', TestDirective);

function TestDirective($compile){
    var directive = {
        restrict: 'A',
        transclude: true,
        template:'[<ng-transclude></ng-transclude>]',
        scope: true,
        link: ($scope, element)=>{
        },
    };
    return directive;
}