'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogTrigger', DialogTrigger);

    function DialogTrigger($compile) {
        var directive = {
            restrict: 'A',
            require: '^^dialog',
            scope: {
                dialogName: '@dialogTrigger'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, dialogCtrl){
            element.removeAttr('dialog-trigger');
            element.attr('ng-click', `toggle()`);
            scope.toggle = toggle;

            $compile(element)(scope);

            function toggle(){
                dialogCtrl.toggle(scope.dialogName);
            }
        }
    }
})();
