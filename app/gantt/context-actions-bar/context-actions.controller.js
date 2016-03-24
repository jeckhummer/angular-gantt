(function () {
    angular.module('gantt').controller('ContextActionsController', ContextActionsController);

    function ContextActionsController(TaskClickService) {
        var ctrl = this;

        ctrl.selectAll = selectAll;
        ctrl.unselectAll = unselectAll;
        ctrl.narrowInfo = narrowInfo;
        ctrl.expandInfo = expandInfo;

        function selectAll() {
            TaskClickService.selectAll();
        }

        function unselectAll() {
            TaskClickService.unselectAll();
        }

        function narrowInfo() {
            // TODO
        }

        function expandInfo() {
            // TODO
        }
    }
})();
