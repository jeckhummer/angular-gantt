'use strict';

angular.module('app', [
    'ngRoute',
    'gantt',
    'timeline',
    'common'
]);

(function () {
    angular.module('app').config(AppRouterConfig);

    function AppRouterConfig($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/gantt'});
    }
}());

(function () {
    angular.module('app').config(GanttTimelineConfig);

    function GanttTimelineConfig(GanttTimelineServiceProvider) {
        var config = [
            {
                typeName: 'year',
                label: 'Year',
                visible: true,
                stripes: false
            },
            {
                typeName: 'month',
                label: 'Month',
                visible: true,
                stripes: false
            },
            {
                typeName: 'half-month',
                label: 'Half Month',
                visible: true,
                stripes: true
            },
            {
                typeName: 'week',
                label: 'Week',
                visible: true,
                stripes: false
            }
        ];

        GanttTimelineServiceProvider.setTimelineDefaults(config);
    }
})();
