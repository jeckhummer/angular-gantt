'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineStripes', TimelineStripesDirective);

    function TimelineStripesDirective(TimeLineGridService, TimelineService, TimelineTypes) {
        var directive = {
            templateUrl: 'timeline/timeline-stripes/timeline-stripes.directive.html',
            restrict: 'E',
            scope: true,
            link: function ($scope) {
                initGrids();

                $scope.$on('timeline-config-changed', initGrids);
                $scope.$on('boundaries-changed', initGrids);

                function initGrids(){
                    var dateInterval = TimelineService.getBoundaries();
                    var config = TimelineService.getConfig();

                    for(var name in config){
                        if(config[name].stripes){
                            var type = TimelineTypes[config[name].typeName];
                            $scope.grid = TimeLineGridService.generate(type, dateInterval);
                            $scope.stripesStyle = config[name].stripesStyle;
                            break;
                        }
                    }
                    config.forEach(function(configItem){
                    });
                }
            }
        };
        return directive;
    }
})();