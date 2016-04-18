'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogWindow', DialogWindow);

    function DialogWindow($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            $rootScope.$on('dialog-background-loaded', _notify);
            _notify();

            function _notify() {
                $rootScope.$broadcast('dialog-window-loaded', element);
            }
        }
    }
})();