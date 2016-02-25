angular.module('app-dev', ['app', 'ngMockE2E']);

(function () {
    angular.module('app-dev').run(HttpMocks);

    function HttpMocks($httpBackend, HttpService, GanttTasksMock, GanttTimelineOptionsMock) {
        $httpBackend.whenGET(HttpService.getResourceUrl('gantt-tasks'))
            .respond(200, GanttTasksMock);

        $httpBackend.whenGET(HttpService.getResourceUrl('gantt-timeline-options'))
            .respond(200, GanttTimelineOptionsMock);

        $httpBackend.whenGET().passThrough();
    }
})();

(function () {
    angular.module('app-dev').config(HttpDelayDecorator);

    function HttpDelayDecorator($provide) {
        $provide.decorator("HttpService", DelayedHttpService);
    }

    function DelayedHttpService($delegate, $q) {
        var service = {
            getResource: getDelayedFunction($delegate.getResource, 1),
            postResource: getDelayedFunction($delegate.postResource, 2),
            getResourceUrl: $delegate.getResourceUrl
        };
        return service;

        function getDelayedFunction(func, delayArgumentIndex) {
            var delayedFunc = function () {
                var args = arguments;
                var delay = args[delayArgumentIndex] || 0;
                var promise = $q(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, delay);
                }).then(function () {
                    return func.apply(service, args);
                });
                return promise;
            };
            return delayedFunc;
        }
    }
})();

(function () {
    angular.module('app-dev').value('GanttTasksMock', getGanttTasksMock());

    function getGanttTasksMock() {
        var mock = [
            {
                id: 1,
                name: "Task 1",
                date: {
                    start: "2015-12-20",
                    end: "2016-11-10"
                },
                parentID: 0,
                percentComplete: 66,
            },
            {
                id: 2,
                name: "SubTask A",
                date: {
                    start: "2015-12-20",
                    end: "2016-04-01"
                },
                parentID: 1,
                percentComplete: 100,
            },
            {
                id: 3,
                name: "SubTask B",
                date: {
                    start: "2016-04-01",
                    end: "2016-08-16"
                },
                parentID: 1,
                percentComplete: 77,
            },
            {
                id: 4,
                name: "SubTask C",
                date: {
                    start: "2016-08-16",
                    end: "2016-11-10"
                },
                parentID: 1,
                percentComplete: 11,
            },
            {
                id: 5,
                name: "Task 2",
                date: {
                    start: "2016-05-22",
                    end: "2016-12-02"
                },
                parentID: 0,
                percentComplete: 50,
            },
            {
                id: 6,
                name: "Sub Millestone A",
                date: {
                    start: "2016-05-22",
                    end: "2016-05-22"
                },
                parentID: 5,
                percentComplete: 100,
            },
            {
                id: 7,
                name: "SubTask A",
                date: {
                    start: "2016-05-22",
                    end: "2016-06-29"
                },
                parentID: 5,
                percentComplete: 33,
            },
            {
                id: 8,
                name: "SubTask B",
                date: {
                    start: "2016-06-29",
                    end: "2016-11-10"
                },
                parentID: 5,
                percentComplete: 39,
            },
            {
                id: 9,
                name: "SubTask C",
                date: {
                    start: "2016-11-10",
                    end: "2016-12-01"
                },
                parentID: 5,
                percentComplete: 88,
            },
            {
                id: 10,
                name: "Sub Millestone B",
                date: {
                    start: "2016-12-01",
                    end: "2016-12-01"
                },
                parentID: 5,
                percentComplete: 0,
            }
        ];
        return mock;
    }
})();

(function () {
    angular.module('app-dev').value('GanttTimelineOptionsMock', GanttTimelineOptionsMock());

    function GanttTimelineOptionsMock() {
        var mock = [
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
                stripes: true
            },
            {
                typeName: 'half-month',
                label: 'Half Month',
                visible: false,
                stripes: false
            },
            {
                typeName: 'week',
                label: 'Week',
                visible: true,
                stripes: false
            }
        ];
        return mock;
    }
})();