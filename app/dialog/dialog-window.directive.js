'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogWindow', DialogWindow);

    function DialogWindow() {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attr){ }
    }
})();