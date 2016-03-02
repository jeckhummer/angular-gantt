(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($scope){
        var taskCtrl = this;

        taskCtrl.start = $scope.task.dateInterval.start;
        taskCtrl.end = $scope.task.dateInterval.end;
        taskCtrl.isParent = $scope.task.parentID == 0;
        taskCtrl.isMilestone = $scope.task.dateInterval.days == 1;
        taskCtrl.isCompleted = $scope.task.percentComplete == 100;
        taskCtrl.percentComplete = $scope.task.percentComplete;
        taskCtrl.name = $scope.task.name;
        taskCtrl.position =
            DateIntervalPosition($scope.ganttCtrl.boundaries, $scope.task.dateInterval);
        taskCtrl.closerToEnd =
            (100 - taskCtrl.position.left - taskCtrl.position.width) < +taskCtrl.position.left;
    }
})();
