'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogBackground', DialogBackground);

    function DialogBackground($compile, $rootScope) {
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
                     class="fog-cover"></div>
            `);
            $compile(background)(scope);
            element.css('position', 'relative');
            element.append(background);

            $rootScope.$on('dialog-window-loaded', function (event, window) {
                _initDialogWindow(window);
            });

            $rootScope.$broadcast('dialog-background-loaded');

            function _initDialogWindow(window){
                var name = $(window).attr('dialog-window');

                var windowWrapper = $compile(`
                    <div ng-click="$event.stopPropagation();"
                         ng-show="dialogCtrl.dialogIsActive('${name}')"></div>
                `)(scope);

                windowWrapper.append(window);
                background.append(windowWrapper);
            }
        }
    }
})();