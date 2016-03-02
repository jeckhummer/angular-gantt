angular.module('test').directive('parent', Parent);

function Parent($compile){
    var directive = {
        scope: {},
        restrict: 'A',
        bindToController: {
            val: '@value'
        },
        priority: 8,
        controller: 'testController as ctrl',
        compile: function($element){
            var label = angular.element('<div>Val: {{ctrl.val}}</div>');
            $element.append(label);

            return function($scope, $element){
                console.log('parent');
                $compile($element.children())($scope);
            }
        },
        //compile: function (element) {
        //    element.removeAttr('test');
        //    element.attr('ng-click', `ctrl.test()`);
        //    return link;
        //
        //    function link($scope, element, attr, ctrl){
        //        console.log(ctrl);
        //        $scope.test = function(){
        //            alert('testfsdf');
        //        }
        //        $compile(element)($scope);
        //    }
        //}
    };
    return directive;
}

