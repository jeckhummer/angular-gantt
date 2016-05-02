(function(){
    angular.module('gantt').controller('GanttTaskInfoEditorController', GanttTaskInfoEditorController);

    function GanttTaskInfoEditorController($scope, GanttTasksService, GanttTaskFactoryService, GanttTasksHierarchyService){
        var ctrl = this;
        var today = new Date();
        var taskEndDateBackup;

        ctrl.addTask = addTask;
        ctrl.updateTask = updateTask;
        ctrl.submit = submit;
        ctrl.swapDates = swapDates;
        ctrl.toggleIsMilestone = toggleIsMilestone;
        ctrl.parentTasksPredicate = parentTasksPredicate;
        ctrl.moveTaskToBegining = moveTaskToBegining;
        ctrl.isLoading = false;

        $scope.$on('task-editor-opened', initTask);
        $scope.$on('task-editor-opened', initParentTasks);

        $("#is-milestone").bootstrapSwitch();

        function initParentTasks(){
            ctrl.parentTasks =  GanttTasksService.getAll();
        }

        function parentTasksPredicate(value){
            var id = ctrl.task.id;
            var isItself = value.id != id;
            var isChild = GanttTasksHierarchyService.isChildOf(value.id, id);
            return  isItself && !   isChild;
        }

        function initTask(event, taskID){
            ctrl.editMode = taskID != null;

            if(!ctrl.editMode){
                var today = new Date();
                ctrl.task = GanttTaskFactoryService.create({
                    name: 'New Task',
                    parentID: 0,
                    percentComplete: 0,
                    isMilestone: false
                });
                ctrl.task.setStartDate(today);
                ctrl.task.setEndDate(today);
            }else{
                ctrl.task = GanttTasksService.getTask(taskID).clone();
            }

            ctrl.task._start = ctrl.task.startDate;
            ctrl.task._end = ctrl.task.endDate;

            backupTaskEndDate();
        }

        function addTask(){
            return GanttTasksService.addTask(ctrl.task);
        }

        function updateTask(){
            return GanttTasksService.updateTask(ctrl.task);
        }

        function submit(){
            ctrl.task.setStartDate(ctrl.task._start);
            ctrl.task.setEndDate(ctrl.task.isMilestone ? ctrl.task._start : ctrl.task._end);

            var isValidDateOrder = validateDatesOrder();
            $scope.taskForm.$error.datesOrder = !isValidDateOrder;

            if(isValidDateOrder) {
                ctrl.editMode ? ctrl.updateTask() : ctrl.addTask();
            }
        }

        function validateDatesOrder(){
            return ctrl.task.isMilestone || ctrl.task.dateInterval.days > 0;
        }

        function swapDates(){
            var tmp = ctrl.task._start;
            ctrl.task._start = ctrl.task._end;
            ctrl.task._end = tmp;
            $scope.taskForm.$error.datesOrder = validateDatesOrder();
        }

        function toggleIsMilestone(){
            if(!ctrl.task.isMilestone){
                restoreTaskEndDate();
            }else{
                backupTaskEndDate();
                ctrl.task._end = ctrl.task._start;
            }
        }

        function backupTaskEndDate(){
            taskEndDateBackup = ctrl.task._end;
        }

        function restoreTaskEndDate(){
            if(taskEndDateBackup) ctrl.task._end = taskEndDateBackup;
        }

        function moveTaskToBegining(id){
            GanttTasksService.moveTaskToBegining(id);
        }
    }
})();
