(function(){
    angular.module('gantt').controller('TaskEditorController', TaskEditorController);

    function TaskEditorController($scope, GanttTasksService, GanttTaskFactoryService, GanttStatusReporterService, DialogService){
        var editor = this;
        var today = new Date();

        editor.addTask = addTask;
        editor.updateTask = updateTask;
        editor.submit = submit;
        editor.swapDates = swapDates;

        $scope.$on('task-editor-opened', init);

        function init(event, taskID){
            editor.editMode = taskID != null;

            if(!editor.editMode){
                var today = new Date();
                editor.task = GanttTaskFactoryService.create({
                    name: 'New Task',
                    parentID: 0,
                    percentComplete: 0
                });
                initTaskDates(today, today);
            }else{
                editor.task = GanttTasksService.getTask(taskID).clone();
            }

            editor.task._start = editor.task.startDate;
            editor.task._end = editor.task.endDate;
        }

        function initTaskDates(startDate, endDate){
            editor.task.setStartDate(startDate);
            editor.task.setEndDate(endDate);
        }

        function addTask(){
            var promise = GanttTasksService.addTask(editor.task);
            GanttStatusReporterService.trackDialog(
                promise,
                'Saving task',
                'task-editor'
            );
        }

        function updateTask(){
            var promise = GanttTasksService.updateTask(editor.task);
            GanttStatusReporterService.trackDialog(
                promise,
                'Saving task',
                'task-editor'
            );
        }

        function submit(){
            initTaskDates(editor.task._start, editor.task._end);
            var isValidDateOrder = validateDatesOrder();

            if(isValidDateOrder) {
                editor.editMode ? editor.updateTask() : editor.addTask();
                DialogService.toggleDialog('task-editor');
            }
            else $scope.taskForm.$error.datesOrder = true;
        }

        function validateDatesOrder(){
            return getDaysBetween() >= 0;
        }

        function getDaysBetween(){
            return editor.task.dateInterval.days;
        }

        function swapDates(){
            var tmp = editor.task._start;
            editor.task._start = editor.task._end;
            editor.task._end = tmp;
            $scope.taskForm.$error.datesOrder = validateDatesOrder();
        }
        // TODO: milestone
    }
})();
