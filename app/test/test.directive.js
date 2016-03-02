angular.module('test').directive('test', TestDirective);

function TestDirective($compile){
    var directive = {
        scope: {
            value: '@'
        },
        require: '^parent',
        restrict: 'A',
        priority: 6,

        //bindToController: {
        //    val: '@value'
        //},
        //controller: 'testController as ctrl2',
        compile: function (element) {
            element.removeAttr('test');
            element.attr('ng-click', `test()`);

            return function ($scope, element, attr, ctrl){
                console.log('child');
                ctrl.val = $scope.value;
                ctrl.test();
                $scope.test = ctrl.test;
                $compile(element)($scope);
            };
        }
    };
    return directive;
}

