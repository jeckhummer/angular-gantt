(function(){
    angular.module('gantt').controller('TaskEditorController', TaskEditorController);

    function TaskEditorController($scope, $rootScope, GanttTasksService, GanttTaskFactoryService, $q, GanttStatusReporterService){
        var editor = this;
        var today = new Date();

        editor.addTask = addTask;
        editor.updateTask = updateTask;

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
                editor.task = GanttTasksService.getTask(taskID);
            }

            editor.task._start = editor.task.startDate;
            editor.task._end = editor.task.endDate;
        }

        function initTaskDates(startDate, endDate){
            editor.task.setStartDate(startDate);
            editor.task.setEndDate(endDate);
        }

        function addTask(){
            initTaskDates(editor.task._start, editor.task._end);
            var promise = GanttTasksService.addTask(editor.task);
            GanttStatusReporterService.trackDialog(
                promise,
                'Saving task',
                'task-editor'
            );
            notifyAboutChanges();
        }

        function updateTask(){
            initTaskDates(editor.task._start, editor.task._end);
            var promise = GanttTasksService.updateTask(editor.task);
            GanttStatusReporterService.trackDialog(
                promise,
                'Saving task',
                'task-editor'
            );
            notifyAboutChanges();
        }

        function notifyAboutChanges(){
            $rootScope.$broadcast('gantt-tasks-data-changed');
        }
        // TODO: milestone
    }
})();
