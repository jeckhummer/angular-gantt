(function(){
    angular.module('gantt').controller('GanttTaskClickController', GanttTaskClickController);

    function GanttTaskClickController(TaskClickService){
        var ctrl = this;

        ctrl.select = select;
        ctrl.isSelected = isSelected;
        ctrl.onClick = onClick;
        ctrl.onRightClick = onRightClick;

        function onRightClick(event, id) {
            TaskClickService.registerRightClick(id);
        }

        function onClick(event, id){
            if(event.ctrlKey) {
                select(id);
                event.stopPropagation();
            }
        }

        function select(id){
            TaskClickService.toggleTask(id);
        }

        function isSelected(id){
            return TaskClickService.isTaskSelected(id);
        }
    }
})();
