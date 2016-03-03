'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogTrigger', DialogTrigger);

    function DialogTrigger($compile, $rootScope) {
        var directive = {
            restrict: 'A',
            scope: {
                dialogName: '@dialogTrigger',
                dialogGroup: '@dialogGroup'
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
                $rootScope.$broadcast('dialog-toggle', scope.dialogName, scope.dialogGroup);
            }
        }
    }
})();
