(function () {
    angular.module('app-dev').value('GanttTasksMock', getGanttTasksMock());

    function getGanttTasksMock() {
        var tasks = [
            { id: 1, name: "Task 1", start: "2015-12-20", end: "2016-11-10", parentID: 0, percentComplete: 66},
            { id: 2, name: "SubTask A", start: "2015-12-20", end: "2016-04-01", parentID: 1, percentComplete: 100},
            { id: 3, name: "SubTask B", start: "2016-04-01", end: "2016-08-16", parentID: 1, percentComplete: 77},
            { id: 4, name: "SubTask C", start: "2016-08-16", end: "2016-11-10", parentID: 1, percentComplete: 11},
            { id: 5, name: "Task 2", start: "2016-05-22", end: "2016-12-02", parentID: 0, percentComplete: 50},
            { id: 6, name: "Sub Milestone A long name bla bla bla", start: "2016-05-22", end: "2016-05-22", parentID: 5, percentComplete: 100},
            { id: 7, name: "SubTask A", start: "2016-05-22", end: "2016-06-29", parentID: 5, percentComplete: 33},
            { id: 8, name: "SubTask B", start: "2016-06-29", end: "2016-11-10", parentID: 5, percentComplete: 39},
            { id: 9, name: "SubTask C", start: "2016-11-10", end: "2016-12-01", parentID: 5, percentComplete: 88},
            { id: 10, name: "Sub Milestone B", start: "2016-12-01", end: "2016-12-01", parentID: 5, percentComplete: 0}
        ];

        var saveResponse = {
            success: {
                status: 'success',
                message: ''
            },
            error: {
                status: 'error',
                message: 'Shit happens!'
            }
        };

        var mock = {
            tasks: tasks,
            saveResponse: saveResponse
        };
        return mock;
    }
})();
