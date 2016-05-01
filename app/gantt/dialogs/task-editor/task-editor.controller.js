(function(){
    angular.module('gantt').controller('TaskEditorController', TaskEditorController);

    function TaskEditorController(){
        var ctrl = this;

        $('#task-editor-tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
})();
