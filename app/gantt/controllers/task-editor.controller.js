(function(){
    angular.module('gantt').controller('TaskEditorController', TaskEditorController);

    function TaskEditorController($rootScope, GanttTasksService){
        var editor = this;
        var today = new Date();

        editor.task = {
            name: 'New Task',
            date: {
                start: today,
                end: today
            },
            parentID: 0,
            percentComplete: 0
        };

        editor.saveTask = saveTask;

        function saveTask(){
            GanttTasksService.saveTask(editor.task);
            $rootScope.$broadcast('dialog-toggle','add-task');
        }
        // TODO: milestone
    }
})();
