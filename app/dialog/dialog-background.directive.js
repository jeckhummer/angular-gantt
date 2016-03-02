'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogBackground', DialogBackground);

    function DialogBackground($compile) {
        var directive = {
            restrict: 'A',
            require: '^dialog',
            scope: true,
            link: link,
        };
        return directive;

        function link(scope, element, attr, dialogCtrl){
            element.css('position', 'relative');

            var background = angular.element(`
                <div ng-show="isActive" ng-click="deactivate()" class="fog-cover"></div>
            `);
            element.append(background);

            scope.$watch(function(){
                return dialogCtrl.isActive();
            }, function(){
                scope.isActive = dialogCtrl.isActive();
            });

            scope.deactivate = dialogCtrl.deactivate;
            $compile(element.children())(scope);
        }
    }
})();