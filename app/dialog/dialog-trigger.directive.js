'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogTrigger', DialogTrigger);

    function DialogTrigger($compile) {
        var directive = {
            restrict: 'A',
            transclude: 'element',
            controller: 'DialogTriggerController as triggerCtrl',
            bindToController: true,
            scope: {
                dialogName: '@dialogTrigger',
                isToggle: '@dialogToggle',
                group: '@dialogGroup',
                arg: '=dialogArgument'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, triggerCtrl, $transclude){
            var trigger = $transclude((element)=>{
                element.attr('ng-click', `triggerCtrl.toggle()`);
                if(triggerCtrl.isToggle)
                    element.attr('ng-class', `{'active': triggerCtrl.isActive()}`);
            });

            trigger.removeAttr('dialog-trigger');
            $compile(trigger)(scope);
            element.after(trigger);
        }
    }
})();
