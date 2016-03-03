'use strict';
(function () {
    angular.module('dialog')
        .directive('dialogWindow', DialogWindow);

    function DialogWindow($compile, $rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attr, dialogCtrl){ }
    }
})();