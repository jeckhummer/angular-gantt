(function(){
    angular.module('gantt').controller('TaskSelectionController', TaskSelectionController);

    function TaskSelectionController(TaskSelectionService){
        var ctrl = this;

        ctrl.select = select;
        ctrl.isSelected = isSelected;

        function select(event, id){
            if(event.ctrlKey) {
                TaskSelectionService.toggleTask(id);
                event.stopPropagation();
            }
        }

        function isSelected(id){
            return TaskSelectionService.isTaskSelected(id);
        }
    }
})();
