'use strict';
(function () {
    angular.module('gantt').provider('GanttTimelineService', GanttTimelineServiceProvider);

    function GanttTimelineServiceProvider(){
        var config = [];

        this.setTimelineDefaults = configureTimeline;
        this.$get = GanttTimelineService;

        function configureTimeline(_config){
            config = _config;
        }

        function GanttTimelineService(GanttDataHTTPService, $rootScope) {
            var service = {
                getConfig: getConfig,
                saveConfig: saveConfig,
            };
            init();
            return service;

            function init(){
                GanttDataHTTPService.getConfig()
                    .then(configureTimeline)
                    .then(notifyAboutChanges)
                    .catch(function (error) {
                        console.log('GanttDataHTTPService [timeline options] fetching error: ' + error);
                    });
            }

            function getConfig(){
                return config;
            }

            function saveConfig(){
                return GanttDataHTTPService.saveConfig(config);
            }

            function notifyAboutChanges(){
                $rootScope.$broadcast('gantt-timeline-config-changed');
            }
        }
    }
})();
