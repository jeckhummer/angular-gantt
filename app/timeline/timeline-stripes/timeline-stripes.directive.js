'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineStripes', TimelineStripesDirective);

    function TimelineStripesDirective(TimeLineGridService, TimelineTypes) {
        var directive = {
            templateUrl: 'timeline/timeline-stripes/timeline-stripes.directive.html',
            restrict: 'E',
            scope: {
                'config': '=',
                'dateInterval': '='
            },
            link: function (scope) {
                if(scope.dateInterval == null) return;
                scope.$watch('config', initGrids, true);
                scope.$watch('dateInterval', initGrids);

                function initGrids(){
                    for(var name in scope.config){
                        if(scope.config[name].stripes){
                            var type = TimelineTypes[scope.config[name].typeName];
                            scope.grid = TimeLineGridService.generate(type, scope.dateInterval);
                            scope.stripesStyle = scope.config[name].stripesStyle;
                            break;
                        }
                    }
                    scope.config.forEach(function(configItem){
                    });
                }
            }
        };
        return directive;
    }
})();