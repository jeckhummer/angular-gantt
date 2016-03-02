'use strict';
angular.module('timeline', ['ngSanitize']);

(function () {
    angular.module('timeline')
        .directive('timeline', TimelineDirective);

    function TimelineDirective (TimelineTypes, TimeLineGridService, $sce) {
        var directive = {
            templateUrl: 'timeline/timeline/timeline.directive.html',
            restrict: 'E',
            scope: {
                'config': '=',
                'dateInterval': '=',
            },
            link: function ($scope) {
                $scope.$watch('config', initGrids, true);
                $scope.$watch('dateInterval', initGrids);

                function initGrids(){
                    $scope.grids = [];

                    if($scope.dateInterval != null){
                        $scope.config.forEach(function (configItem) {
                           if(configItem.visible){
                               var type = TimelineTypes[configItem.typeName];
                               if(!type) throw `Unknown timeline type: ${configItem.typeName}`;

                               var gridObject = {
                                   grid: TimeLineGridService.generate(type, $scope.dateInterval),
                                   label: $sce.getTrustedHtml(configItem.label)
                               };
                               $scope.grids.push(gridObject);
                           }
                        });
                    }
                }
            }
        };
        return directive;
    }
})();