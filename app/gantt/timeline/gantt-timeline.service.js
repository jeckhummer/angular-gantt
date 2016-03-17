'use strict';
(function () {
    angular.module('gantt').provider('GanttTimelineService', GanttTimelineServiceProvider);

    function GanttTimelineServiceProvider(){
        var config = [];
        var boundaries;

        this.setTimelineDefaults = configureTimeline;
        this.$get = GanttTimelineService;

        function configureTimeline(_config){
            config = _config;
        }

        function GanttTimelineService(GanttDataHTTPService, GanttTasksService, DateService, GanttBaselinesService, $rootScope) {
            var service = {
                getConfig: getConfig,
                saveConfig: saveConfig,
                getBoundaries: getBoundaries
            };
            init();
            return service;

            function init(){
                GanttDataHTTPService.getConfig()
                    .then(configureTimeline)
                    .then(onTimelineConfigChanged)
                    .catch(function (error) {
                        console.log('GanttDataHTTPService [timeline options] fetching error: ' + error);
                    });

                $rootScope.$on('current-baseline-changed', calculateBoundaries);
                $rootScope.$on('baselines-changed', calculateBoundaries);
                $rootScope.$on('tasks-changed', calculateBoundaries);
            }

            function getConfig(){
                return config;
            }

            function saveConfig(){
                return GanttDataHTTPService.saveConfig(config);
            }

            function getBoundaries(){
                return boundaries;
            }

            function calculateBoundaries() {
                var starts = [];
                var ends = [];
                var tasks = GanttTasksService.getAll();

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

                onBoundariesChanges();
            }

            function onBoundariesChanges() {
                $rootScope.$broadcast('boundaries-changed');
            }

            function onTimelineConfigChanged(){
                $rootScope.$broadcast('gantt-timeline-config-changed');
            }
        }
    }
})();
