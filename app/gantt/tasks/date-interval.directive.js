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
            $scope.$watchCollection(getDates, init);

            function getDates(){
                return {
                    start: $scope.startStr,
                    end: $scope.endStr
                };
            }

            function init(dates){
                $scope.start = DateService.format(dates.start);
                $scope.end = DateService.format(dates.end);
            }
        }
    }
})();
