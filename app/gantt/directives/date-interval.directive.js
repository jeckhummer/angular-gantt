'use strict';
(function () {
    angular.module('gantt')
        .directive('dateInterval', DateInterval);

    function DateInterval(DateService) {
        var directive = {
            restrict: 'E',
            scope: {
                startStr: '=start',
                endStr: '=end'
            },
            template: '{{start}} / {{end}}',
            link: link
        };
        return directive;

        function link($scope){
            $scope.start = DateService.format($scope.startStr);
            $scope.end = DateService.format($scope.endStr);
        }
    }
})();
