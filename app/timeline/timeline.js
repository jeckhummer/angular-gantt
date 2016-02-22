'use strict';
angular.module('timeline', ['ngSanitize']);

(function () {
    angular.module('timeline')
        .controller('TimelineController', TimelineController);

    function TimelineController (TimelineTypes, TimeLineGrid, $sce, $scope) {
        var timeline = this;
        var timelineTypes = {
            'year': TimelineTypes.year,
            'month': TimelineTypes.month,
            'half month': TimelineTypes.halfMonth,
            'week': TimelineTypes.week
        };

        timeline.grids = {};
        for(var name in timelineTypes){
            timeline.grids[name] = TimeLineGrid.generate(timelineTypes[name], $scope.tasksCtrl.overallDateInterval);
            timeline.grids[name].label = $sce.getTrustedHtml(timeline.grids[name].label);
        }
    }
})();