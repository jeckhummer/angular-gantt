/**
 * Created by Maksim on 2/21/2016.
 */

'use strict';

angular.module('timeline', ['ngSanitize'])
    .controller('TimelineController', function ($scope, TimelineTypes, TimeLineGrid, $sce) {
        var timelineTypes = {
            'year': TimelineTypes.year,
            'month': TimelineTypes.month,
            'half month': TimelineTypes.halfmonth,
            'week': TimelineTypes.week
        };

        $scope.grids = {};

        for(var name in timelineTypes){
            $scope.grids[name] = TimeLineGrid.generate(timelineTypes[name], $scope.overallDateInterval);
            $scope.grids[name].label = $sce.getTrustedHtml($scope.grids[name].label);
        }
    })