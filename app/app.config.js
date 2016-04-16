'use strict';

angular.module('app', ['gantt', 'timeline', 'common', 'dialog' ]);

(function () {
    angular.module('timeline').config(TimelineConfig);

    function TimelineConfig(TimelineServiceProvider) {
        var config = [
            {
                typeName: 'year',
                label: 'Year',
                visible: true,
                stripes: false,
            },
            {
                typeName: 'month',
                label: 'Month',
                visible: true,
                stripes: false,
            },
            {
                typeName: 'half-month',
                label: 'Half Month',
                visible: true,
                stripes: true,
            },
            {
                typeName: 'week',
                label: 'Week',
                visible: true,
                stripes: false,
            }
        ];

        TimelineServiceProvider.setTimelineDefaults(config);

        TimelineServiceProvider.configureCalculateBoundariesTriggers([
            'current-baseline-changed',
            'baselines-changed',
            'tasks-changed'
        ]);

        TimelineServiceProvider.configureConfigurationProviderInjector(($injector)=>
            $injector.get('GanttDataProviderService')
        );

        TimelineServiceProvider.configureCalculateBoundariesMethod(($injector)=>{
            var GanttTasksService = $injector.get('GanttTasksService');
            var GanttBaselinesService = $injector.get('GanttBaselinesService');

            var starts = [];
            var ends = [];
            var tasks = GanttTasksService.getAll();
            var boundaries;

            angular.forEach(tasks, function (task) {
                starts.push(task.startMoment);
                ends.push(task.endMoment);

                var baselineTask = GanttBaselinesService.getTask(task.id);
                if(baselineTask){
                    starts.push(baselineTask.startMoment);
                    ends.push(baselineTask.endMoment);
                }
            });

            var boundariesNew = new DateInterval(moment.min(starts), moment.max(ends));
            if (!boundaries || !boundaries.isEqual(boundariesNew)) {
                boundaries = boundariesNew;
            }

            return boundaries;
        });
    }
})();

(function () {
    //angular.module('app').config(HttpServiceConfig);
    //
    //function HttpServiceConfig(HttpServiceProvider){
    //
    //    HttpServiceProvider.setUrlMapping();
    //}
    //
    //function urlMapping
})();