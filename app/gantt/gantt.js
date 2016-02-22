'use strict';
angular.module('gantt', ['ngRoute', 'timeline']);

(function(){
    angular.module('gantt').config(GanttRouteConfig);

    function GanttRouteConfig ($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html',
            controller: 'TaskListController',
            controllerAs: 'tasksCtrl'
        });
    }
})();

(function(){
    angular.module('gantt').controller('TaskListController', TaskListController);

    function TaskListController (tasks) {
        var list = this;
        list.tasks = tasks.getAll();
        list.overallDateInterval = tasks.getDateInterval();
    }
})();

(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController(tasks, $scope){
        var task = $scope.task;
        task.position = DateIntervalPosition(tasks.getDateInterval(), task.dateInterval);
        task.closerToEnd =(100 - task.position.left - task.position.width) < +task.position.left;
        task.isParent = task.parent_id == 0;
        task.isMilestone = task.dateInterval.days == 1;
        task.isCompleted = task.percent_complete == 100;
    }
}());


