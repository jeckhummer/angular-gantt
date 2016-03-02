'use strict';
(function () {
    angular.module('dialog')
        .directive('dialog', Dialog);

    function Dialog($compile) {
        var directive = {
            restrict: 'AE',
            controller: 'DialogController as dialogCtrl',
            link: link,
        };
        return directive;

        function link(scope, element) {
            var el = $(element);

            // по классу иза того, что прежде я убираю аттрибут dialog-window (чтоб избежать inf.loop)
            var dialogWindows = el.find('.dialog-window');
            var bg = el.find('[dialog-background] .fog-cover');

            dialogWindows.appendTo(bg);
        }
    }
})();