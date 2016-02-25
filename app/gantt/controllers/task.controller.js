(function(){
    angular.module('gantt').controller('TaskController', TaskController);

    function TaskController($scope){
        var taskCtrl = this;
        var task = $scope.task;
        var di = task.dateInterval;

        taskCtrl.start = di.start;
        taskCtrl.end = di.end;
        taskCtrl.isParent = task.parentID == 0;
        taskCtrl.isMilestone = di.days == 1;
        taskCtrl.isCompleted = task.percentComplete == 100;
        taskCtrl.percentComplete = task.percentComplete;
        taskCtrl.name = task.name;
        taskCtrl.position = DateIntervalPosition($scope.ganttCtrl.boundaries, di);
        taskCtrl.closerToEnd = (100 - taskCtrl.position.left - taskCtrl.position.width) < +taskCtrl.position.left;
    }
})();
