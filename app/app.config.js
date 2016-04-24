'use strict';

angular.module('app', ['gantt', 'timeline', 'common', 'dialog']);

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
            $injector.get('GanttConfigDataProviderService')
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
    angular.module('app').config(URLLocaleServiceConfig);

    function URLLocaleServiceConfig(URLLocaleServiceProvider){
        var urlMapping = [
            { name: 'gantt', url: 'gantt/gantt.html'},
            { name: 'tabs', url: 'gantt/tabs/tabs.html'},
            { name: 'toolbar', url: 'gantt/context-actions-bar/context-actions-bar.html'},
            { name: 'task', url: 'gantt/tasks/task.html'},
            { name: 'task-info', url: 'gantt/tasks/tasks-info.html'},
            { name: 'task-context-menu', url: 'gantt/tasks/task-context-menu.html'},

            { name: 'timeline.timeline', url: 'timeline/timeline/timeline.directive.html'},
            { name: 'timeline.options', url: 'timeline/timeline-options/timeline-options.directive.html'},
            { name: 'timeline.stripes', url: 'timeline/timeline-stripes/timeline-stripes.directive.html'},

            { name: 'options', url: 'gantt/dialogs/options/options.html'},
            { name: 'task-editor', url: 'gantt/dialogs/task-editor.html'},
            { name: 'gantt-baselines-menu', url: 'gantt/dialogs/gantt-baselines-menu.html'},
            { name: 'processing-lock', url: 'gantt/dialogs/processing-lock.html'},

            { name: 'test', url: 'test/test.html'}
        ];

        URLLocaleServiceProvider.initMapping(urlMapping);
    }
}());