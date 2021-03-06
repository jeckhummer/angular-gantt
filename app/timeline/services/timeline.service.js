'use strict';
(function () {
    angular.module('timeline').provider('TimelineService', TimelineServiceProvider);

    function TimelineServiceProvider(){
        var provider = this;

        var config = [];
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
                type.visible = _parseBoolean(type.visible);
                type.stripes = _parseBoolean(type.stripes);
            });
            config = _config;
        }

        function _parseBoolean(str){
            return str === true || str === "True" || str === "true";
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

        function TimelineService($rootScope, $injector, DateService) {
            var boundaries;
            var _todayLineWidth = 0;

            var service = {
                getConfig: getConfig,
                saveConfig: saveConfig,
                getBoundaries: getBoundaries,
                getTodayLineWidth: getTodayLineWidth
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

                calculateBoundariesTriggers.forEach(function (event) {
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

            function getTodayLineWidth(){
                return _todayLineWidth;
            }

            function calculateBoundaries() {
                boundaries = calculateBoundariesMethod($injector);

                var todayMoment = DateService.createMoment(DateService.today);
                var todayDateInterval = DateService.createDateInterval(boundaries.start, todayMoment);
                _todayLineWidth = DateService.createDateIntervalPosition(boundaries, todayDateInterval).width;

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
