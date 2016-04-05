(function () {
    angular.module('gantt').controller('ContextActionsController', ContextActionsController);

    function ContextActionsController(GanttOptionsService ,TaskClickService) {
        var ctrl = this;

        ctrl.selectAll = selectAll;
        ctrl.unselectAll = unselectAll;
        ctrl.narrowInfo = narrowInfo;
        ctrl.expandInfo = expandInfo;
        ctrl.isNarrowest = isNarrowest;
        ctrl.isWidest = isWidest;
        ctrl.zoomIn = zoomIn;
        ctrl.zoomOut = zoomOut;
        ctrl.isMaxZoom = isMaxZoom;
        ctrl.isMinZoom = isMinZoom;
        ctrl.indent = GanttOptionsService.indentOptions;

        function selectAll() {
            TaskClickService.selectAll();
        }

        function unselectAll() {
            TaskClickService.unselectAll();
        }

        function narrowInfo() {
            GanttOptionsService.decreaseInfoBlockWidth();
        }

        function expandInfo() {
            GanttOptionsService.increaseInfoBlockWidth();
        }

        function isNarrowest(){
            return GanttOptionsService.isNarrowest();
        }

        function isWidest(){
            return GanttOptionsService.isWidest();
        }

        function isMaxZoom(){
            return GanttOptionsService.isMaxZoom();
        }

        function isMinZoom(){
            return GanttOptionsService.isMinZoom();
        }

        function zoomIn(){
            GanttOptionsService.zoomIn();
        }

        function zoomOut(){
            GanttOptionsService.zoomOut();
        }
    }
})();
