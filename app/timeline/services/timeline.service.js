'use strict';
(function () {
    angular.module('timeline').provider('TimelineService', TimelineServiceProvider);

    function TimelineServiceProvider(){
        var provider = this;

        var config = [];
        var boundaries;
        var calculateBoundariesTriggers = [];
        var calculateBoundariesMethod;
        var configurationProvider;
        var configurationProviderInjector;

        provider.setTimelineDefaults = configureTimeline;
        provider.configureCalculateBoundariesTriggers = configureCalculateBoundariesTriggers;
        provider.configureCalculateBoundariesMethod = configureCalculateBoundariesMethod;
        provider.configureConfigurationProviderInjector = configureConfigurationProviderInjector;
        provider.$get = TimelineService;

        function configureTimeline(_config) {
            _config.forEach(function (type) {
                if (type.visible === "true") {
                    type.visible = true;
                }

                if (type.visible === "false") {
                    type.visible = false;
                }
            });
            //_config.visible = Boolean.parse(_config.visible);
            config = _config;
        }

        function configureCalculateBoundariesTriggers(events){
            calculateBoundariesTriggers = events;
        }

        function configureCalculateBoundariesMethod(func){
            calculateBoundariesMethod = func;
        }

        function configureConfigurationProviderInjector(func){
            configurationProviderInjector = func;
        }

        function TimelineService($rootScope, $injector) {
            var service = {
                getConfig: getConfig,
                saveConfig: saveConfig,
                getBoundaries: getBoundaries
            };
            init();
            return service;

            function init(){
                configurationProvider = configurationProviderInjector($injector);

                configurationProvider.getTimelineConfig()
                    .then(configureTimeline)
                    .then(onTimelineConfigChanged)
                    .catch(function (error) {
                        console.log('[timeline options] fetching error: ' + error);
                    });

                calculateBoundariesTriggers.forEach((event)=>{
                    $rootScope.$on(event, calculateBoundaries);
                });

                calculateBoundaries();
            }

            function getConfig(){
                return config;
            }

            function saveConfig(){
                return configurationProvider.saveTimelineConfig(config);
            }

            function getBoundaries(){
                return boundaries;
            }

            function calculateBoundaries() {
                boundaries = calculateBoundariesMethod($injector);
                onBoundariesChanges();
            }

            function onBoundariesChanges() {
                $rootScope.$broadcast('boundaries-changed');
            }

            function onTimelineConfigChanged(){
                $rootScope.$broadcast('timeline-config-changed');
            }
        }
    }
})();
