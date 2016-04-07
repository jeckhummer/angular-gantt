'use strict';
angular.module('timeline', ['ngSanitize']);

(function () {
    angular.module('timeline')
        .directive('timeline', TimelineDirective);

    function TimelineDirective (TimelineTypes, TimeLineGridService, TimelineService, $sce) {
        var directive = {
            templateUrl: 'timeline/timeline/timeline.directive.html',
            restrict: 'E',
            scope: true,
            link: function ($scope) {
                initGrids();

                $scope.$on('timeline-config-changed', initGrids);
                $scope.$on('boundaries-changed', initGrids);

                function initGrids(){
                    var dateInterval = TimelineService.getBoundaries();
                    var config = TimelineService.getConfig();

                    $scope.grids = [];

                    if(dateInterval != null){
                        config.forEach(function (configItem) {
                           if(configItem.visible){
                               var type = TimelineTypes[configItem.typeName];
                               if(!type) throw `Unknown timeline type: ${configItem.typeName}`;

                               var gridObject = {
                                   grid: TimeLineGridService.generate(type, dateInterval),
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