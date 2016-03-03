(function () {
    angular.module('app-dev').run(HttpMocks);

    function HttpMocks($httpBackend, HttpService, GanttTasksMock, GanttTimelineMock) {
        $httpBackend.whenGET(HttpService.getResourceUrl('gantt-tasks'))
            .respond(200, GanttTasksMock.tasks);

        $httpBackend.whenPOST(HttpService.getResourceUrl('gantt-task', 'post'))
            .respond(200, GanttTasksMock.saveResponse.error);

        $httpBackend.whenGET(HttpService.getResourceUrl('gantt-timeline-options'))
            .respond(200, GanttTimelineMock.options);

        $httpBackend.whenPOST(HttpService.getResourceUrl('gantt-timeline-options', 'post'))
            .respond(200, GanttTimelineMock.response.success);


        $httpBackend.whenGET().passThrough();
    }
})();