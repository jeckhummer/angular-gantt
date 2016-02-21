'use strict';

angular.module('gantt', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html',
        });
    }])

    .controller('TaskListController', ['tasks','$scope', function (tasks, $scope) {
        $scope.tasks = tasks.getAll();
    }])

    .controller('TaskController', ['tasks','$scope', function(tasks, $scope){
        var task = $scope.task;
        task.position = DateIntervalPosition(tasks.getDateInterval(), task.dateInterval);
        task.closerToEnd =
            (100 - task.position.left - task.position.width) < +task.position.left;
        task.direction = {direction: task.closerToEnd ? 'rtl' : 'ltr'};
        task.isParent = task.parent_id == 0;
        task.isMilestone = task.dateInterval.days == 1;
        task.isCompleted = task.percent_complete == 100;
    }]);


