'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineStripes', TimelineStripesDirective);

    function TimelineStripesDirective(TimeLineGridService, TimelineTypes) {
        var directive = {
            template: `
                 <div class="timeline_stripes">
                     <div ng-repeat="stripe in grid"
                        class="stripe" style="width:{{stripe.width}}%"></div>
                 </div>
            `,
            restrict: 'E',
            scope: {
                'config': '=',
                'dateInterval': '='
            },
            link: function (scope) {
                if(scope.dateInterval == null) return;
                scope.$watch('config', initGrids);
                scope.$watch('dateInterval', initGrids);

                function initGrids(){
                    scope.config.forEach(function(configItem){
                        if(configItem.stripes){
                            var type = TimelineTypes[configItem.typeName];
                            scope.grid = TimeLineGridService.generate(type, scope.dateInterval);
                        }
                    });
                }
            }
        };
        return directive;
    }
})();