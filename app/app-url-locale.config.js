'use strict';

(function () {
    angular.module('app').config(URLLocaleServiceConfig);

    function URLLocaleServiceConfig(URLLocaleServiceProvider){
        var urlMapping = [
            { name: 'gantt', url: 'gantt/gantt.html'},
            { name: 'status-bar', url: 'gantt/status-bar/status-bar.html'},
            { name: 'tabs', url: 'gantt/status-bar/tabs.html'},
            { name: 'context-actions-bar', url: 'gantt/context-actions-bar/context-actions-bar.html'},
            { name: 'task', url: 'gantt/tasks/task.html'},
            { name: 'task-info', url: 'gantt/tasks/tasks-info.html'},
            { name: 'task-context-menu', url: 'gantt/tasks/task-context-menu.html'},

            { name: 'timeline.timeline', url: 'timeline/timeline/timeline.directive.html'},
            { name: 'timeline.options', url: 'timeline/timeline-options/timeline-options.directive.html'},
            { name: 'timeline.stripes', url: 'timeline/timeline-stripes/timeline-stripes.directive.html'},

            { name: 'timeline-options', url: 'gantt/dialogs/timeline-options.html'},
            { name: 'task-editor', url: 'gantt/dialogs/task-editor.html'},
            { name: 'gantt-baselines-menu', url: 'gantt/dialogs/gantt-baselines-menu.html'},
            { name: 'processing-lock', url: 'gantt/dialogs/processing-lock.html'},

            { name: 'test', url: 'test/test.html'}
        ];

        var prefix = '';

        URLLocaleServiceProvider.init(urlMapping, prefix);
    }
}());