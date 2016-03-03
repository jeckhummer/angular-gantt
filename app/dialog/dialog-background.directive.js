'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogBackground', DialogBackground);

    function DialogBackground($compile) {
        var directive = {
            restrict: 'A',
            controller: 'DialogController as dialogCtrl',
            scope: true,
            link: link,
        };
        return directive;

        function link(scope, element, attrs, dialogCtrl){
            var groupName = attrs['dialog-background']; // try to replace to [scope : {...}]
            var background = angular.element(`
                <span ng-bind="dialogCtrl.activeDialog"></span>
                <div ng-show="dialogCtrl.isActive()"
                     ng-click="dialogCtrl.deactivate()"
                     class="fog-cover container-fluid"></div>
            `);
            $compile(background)(scope);

            var selector = `[dialog-window]${groupName ? '[dialog-group=' + groupName + ']' : ""}`;
            $(element).find(selector).each((ind, window)=>{
                var name = $(window).attr('dialog-window');
                $(window).addClass('dialog-window');

                var windowWrapper = $compile(`
                    <div ng-click="$event.stopPropagation();"
                         ng-show="dialogCtrl.dialogIsActive('${name}')"></div>
                `)(scope); // try to fix: angular.element
                windowWrapper.append(window);
                background.append(windowWrapper);
            });
            element.css('position', 'relative');
            element.append(background);
        }
    }
})();