'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogBackground', DialogBackground);

    function DialogBackground($compile) {
        var directive = {
            restrict: 'A',
            controller: 'DialogBackgroundController as dialogCtrl',
            scope: true,
            link: link,
        };
        return directive;

        function link(scope, element, attrs){
            var groupName = attrs['dialog-background'];
            var background = angular.element(`
                <div ng-show="dialogCtrl.isActive()"
                     ng-click="dialogCtrl.onClick()"
                     class="fog-cover container-fluid"></div>
            `);
            $compile(background)(scope);

            var selector = `[dialog-window]${groupName ? '[dialog-group=' + groupName + ']' : ""}`;
            $(selector).each((ind, window)=>{
                var name = $(window).attr('dialog-window');
                $(window).addClass('dialog-window');

                var windowWrapper = $compile(`
                    <div ng-click="$event.stopPropagation();"
                         ng-show="dialogCtrl.dialogIsActive('${name}')"></div>
                `)(scope);
                windowWrapper.append(window);
                background.append(windowWrapper);
            });
            element.css('position', 'relative');
            element.append(background);
        }
    }
})();