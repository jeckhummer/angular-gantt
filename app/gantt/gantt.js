'use strict';

angular.module('gantt', ['ngRoute', 'timeline'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html',
            controller: 'TaskListController'
        });
    }])

    .controller('TaskListController',function (tasks, $scope) {
        $scope.tasks = tasks.getAll();
        $scope.overallDateInterval = tasks.getDateInterval();
    })

    .controller('TaskController',function($scope){
        var task = $scope.task;
        task.position = DateIntervalPosition($scope.overallDateInterval, task.dateInterval);
        task.closerToEnd =(100 - task.position.left - task.position.width) < +task.position.left;
        task.isParent = task.parent_id == 0;
        task.isMilestone = task.dateInterval.days == 1;
        task.isCompleted = task.percent_complete == 100;
    });


