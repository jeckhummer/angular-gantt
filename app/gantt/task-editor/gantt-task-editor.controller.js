(function(){
    angular.module('gantt').controller('GanttTaskEditorController', GanttTaskEditorController);

    function GanttTaskEditorController(GanttResourcesService){
        var ctrl = this;

        $('#task-editor-tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
})();
