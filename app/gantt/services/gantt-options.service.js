'use strict';
(function () {
    angular.module('gantt').factory('GanttOptionsService', GanttOptionsService);

    function GanttOptionsService() {
        var indentOptions = new GradientOption(0, 50, 5, 35);
        var infoBlockWidthOptions = new GradientOption(25, 50, 2, 30);
        var zoomOptions = new GradientOption(100, 100000, 50, 100);

        var TASK_ADDITION_STRATEGIES = {
            'PREPEND': 0,
            'APPEND': 1,
        };
        var taskMovementStrategy = TASK_ADDITION_STRATEGIES.PREPEND;

        var service = {
            getTaskAdditionStrategy: getTaskAdditionStrategy,
            TASK_ADDITION_STRATEGIES: TASK_ADDITION_STRATEGIES,
            zoomOptions: zoomOptions,
            indentOptions: indentOptions,
            infoBlockWidthOptions: infoBlockWidthOptions,
            masterMode: true
        };
        return service;

        function getTaskAdditionStrategy(){
            return taskMovementStrategy;
        }
    }
})();

