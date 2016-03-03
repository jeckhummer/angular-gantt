'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogTrigger', DialogTrigger);

    function DialogTrigger($compile, $rootScope) {
        var directive = {
            restrict: 'A',
            transclude: 'element',
            //template:'<ng-transclude></ng-transclude>',
            scope: {
                dialogName: '@dialogTrigger',
                group: '@dialogGroup',
                arg: '=dialogArgument'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, dialogCtrl, $transclude){
            scope.toggle = toggle;

            var trigger = $transclude((element)=>{
                element.attr('ng-click', `toggle()`);
            });

            trigger.removeAttr('dialog-trigger');
            $compile(trigger)(scope);

            element.after(trigger);

            function toggle(){
                $rootScope.$broadcast('dialog-toggle', scope.dialogName, scope.arg, scope.group);
            }
        }
    }
})();
