'use strict';
(function () {
    angular.module('gantt')
        .directive('dateInterval', DateInterval);

    function DateInterval(DateService, $sce) {
        var directive = {
            restrict: 'E',
            scope: {
                startStr: '=start',
                endStr: '=end',
                lineBreak: '@'
            },
            template: '{{start}} <span ng-bind-html="separator"></span> {{end}}',
            link: link
        };
        return directive;

        function link($scope){
            $scope.separator = $sce.getTrustedHtml($scope.lineBreak ? "<br />" : "/");
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
