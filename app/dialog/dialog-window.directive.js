'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogWindow', DialogWindow);

    function DialogWindow($compile, $rootScope) {
        var directive = {
            restrict: 'A',
            require: '^^dialog',
            scope: true,
            link: link
        };
        return directive;

        function link(scope, element, attr, dialogCtrl){
            element.removeAttr('dialog-window');
            element.addClass('dialog-window');
            element.attr('ng-click','$event.stopPropagation();');

            scope.$watch(function(){
                return dialogCtrl.dialogIsActive(attr.dialogWindow);
            },function(val){
                scope.dialogIsActive = val;
            });

            element.attr('ng-show', 'dialogIsActive');
            // TODO: Исправить двухкратную перекомпиляцию (timeline-options)
            $compile(element)(scope);
        }
    }
})();