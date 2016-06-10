'use strict';
(function () {
    angular.module('gantt').service('GanttResourcesActivityService', GanttResourcesActivityService);

    function GanttResourcesActivityService($rootScope, GanttResourcesService, GanttTasksService) {
        var service = this;

        service._taskToConflictsDictionary = new Dictionary([]);
        service._resourceToTaskDictionary = new Dictionary([]);
        service.getConflicts = getConflicts;
        service.isResourceInConflict = isResourceInConflict;

        _connect();
        _init();

        function _connect() {
            $rootScope.$on('tasks-changed', _init);
            $rootScope.$on('resources.data-update', _init);
        }

        function _init(){
            var sortedTimeEdges = GanttTasksService.getAll()
                .reduce(function (edges, task) {
                    return edges.concat([
                        {
                            taskID: task.id,
                            taskName: task.name,
                            type: 'start',
                            date: task.dateInterval.start
                        },
                        {
                            taskID: task.id,
                            taskName: task.name,
                            type: 'end',
                            date: task.dateInterval.end
                        }
                    ]);
                }, [])
                .sort(function (a, b) {
                    if (a.date < b.date) { return -1; }
                    if (a.date > b.date) { return 1; }
                    return 0;
                });

            var starts = [];
            var prev = null;

            function test (edge) {
                return edge.type + " [" + edge.taskName + "] - " + edge.date.format('D MMM YYYY');
            }

            var intervals = sortedTimeEdges.map(function (curr) {
                // console.log(test(curr));
                var interval = null;
                if(prev && !(prev.type == 'end' && curr.type == 'start')){
                    interval = {
                        left: prev.date,
                        right: curr.date,
                        tasks: starts.slice()
                    };
                }
                if(curr.type == 'start'){
                    starts.push(curr.taskID);
                }
                if(curr.type == 'end'){
                    starts.splice(starts.indexOf(curr.taskID), 1);
                }
                prev = curr;
                // interval && console.log("left: [" + interval.left.taskName + "] " + interval.left.type + " - " + interval.left.date.format('D MMM YYYY') +
                //     "\nright: [" + interval.right.taskName + "] " + interval.right.type + " - " + interval.right.date.format('D MMM YYYY') + ' | ' +
                //     interval.intersections.join(', ') + '\n\n'
                // );
                return interval;
            })
            .filter(function (interval) {
                return interval;
            });

            // console.log(intervals);
            // console.log(sortedTimeEdges.map(test).join('\n'));
            console.log('----------------------------------------------------')

            var activity = intervals.map(function (interval) {
                var intervalActivity = {};
                interval.tasks.forEach(function (taskID) {
                    GanttResourcesService.getTaskResources(taskID)
                        .forEach(function (data) {
                            if(intervalActivity[data.resource.id]){
                                intervalActivity[data.resource.id] += data.hours;
                            }else{
                                intervalActivity[data.resource.id] = data.hours;
                            }
                        });
                });
                return intervalActivity;
            });

            var resources = GanttResourcesService.getResources();
            var resourceActivity = resources.map(function (resource) {
                return activity.map(function (intervalActivity) {
                    return intervalActivity[resource.id] || 0;
                });
            });

            console.log('activity', activity);
            console.log('resource activity', resourceActivity);

            var intervalConflicts = activity.map(function (intervalActivity) {
                var resourcesConflicts = {};

                Object.keys(intervalActivity)
                    .forEach(function (key) {
                        if(intervalActivity[key] > 8){
                            resourcesConflicts[key] = intervalActivity[key];
                        }
                    });

                return $.isEmptyObject(resourcesConflicts) ? null : resourcesConflicts;
            });

            console.log('interval conflicts', intervalConflicts);

            var taskConflicts = intervalConflicts.map(function (intervalConflict, i) {
                if(intervalConflict !== null){
                    return intervals[i].tasks.map(function (taskID) {
                        return {
                            conflicts: Object.keys(intervalConflict)
                                .filter(function (resourceID) {
                                    return GanttResourcesService.isResourceAssignedToTask(resourceID, taskID);
                                })
                                .map(function (resourceID) {
                                    return {
                                        resourceID: resourceID,
                                        resourceName: GanttResourcesService.getResource(resourceID).name,
                                        hours: intervalConflict[resourceID]
                                    }
                                }),
                            taskID: taskID,
                            interval: intervals[i]
                        };
                    })
                    .filter(function (data) {
                        return data.conflicts.length > 0;
                    });
                }
                return null;
            })
            .filter(function (x) {
                return x;
            })
            .reduce(function (all, x) {
                return all.concat(x);
            }, []);

            console.log('conflict tasks', taskConflicts);

            service._taskToConflictsDictionary = new Dictionary(
                taskConflicts,
                function (conflict) {
                    return conflict.taskID;
                });

            service._resourceToTaskDictionary = new Dictionary(
                taskConflicts,
                function (conflict) {
                    return conflict.conflicts.map(function (resource) {
                        return resource.resourceID;
                    })
                },
                function (conflict) {
                    return conflict.taskID;
                }
            );

            $rootScope.$broadcast('conflicts.data-update');
            // console.log(_taskToConflictsDictionary.get(6));
        }

        function getConflicts(taskID) {
            return service._taskToConflictsDictionary.get(taskID);
        }
        function isResourceInConflict(resourceID, taskID) {
            return service._resourceToTaskDictionary.get(resourceID)
                .indexOf(parseInt(taskID)) > -1;
        }
    }
})();