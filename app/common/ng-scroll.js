'use strict';
(function () {
    angular.module('common').directive('ngScroll', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var fn = $parse(attrs['ngScroll']);
                $(elem).on('scroll', function (event) {
                    scope.$apply(function() {
                        event.preventDefault();
                        fn(scope, {$event:event});
                    });
                });
            }
        }
    });
}());