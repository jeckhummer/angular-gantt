(function () {
    angular.module('app-dev').value('GanttTasksTestData', getGanttTasksTestData());

    function getGanttTasksTestData() {
        var tasks = [
            { id: 5, name: "Task 2", start: "2016-05-22", end: "2016-12-02", parentID: 0, percentComplete: 50, isMilestone: false, order: 2},
            { id: 6, name: "SMS A", start: "2016-05-22", end: "2016-05-22", parentID: 5, percentComplete: 100, isMilestone: true, order:1},
            { id: 9, name: "SubTask C", start: "2016-11-10", end: "2016-12-01", parentID: 5, percentComplete: 88, isMilestone: false, order:4},
            { id: 7, name: "SubTask A", start: "2016-05-22", end: "2016-06-29", parentID: 5, percentComplete: 33, isMilestone: false, order:2},
            { id: 8, name: "SubTask B", start: "2016-06-29", end: "2016-11-10", parentID: 5, percentComplete: 39, isMilestone: false, order:3},
            { id: 10, name: "SMS B", start: "2016-12-01", end: "2016-12-01", parentID: 5, percentComplete: 0, isMilestone: true, order:5},
            { id: 1, name: "Task 1", start: "2015-12-20", end: "2016-11-10", parentID: 0, percentComplete: 66, isMilestone: false, order: 1},
            { id: 2, name: "SubTask A", start: "2015-12-20", end: "2016-04-01", parentID: 1, percentComplete: 55, isMilestone: false, order: 1},
            { id: 11, name: "SubTask AA", start: "2015-12-25", end: "2016-03-15", parentID: 2, percentComplete: 55, isMilestone: false, order: 1},
            { id: 4, name: "SubTask C", start: "2016-08-16", end: "2016-11-10", parentID: 1, percentComplete: 100, isMilestone: false, order: 3},
            { id: 3, name: "SubTask B", start: "2016-04-01", end: "2016-08-16", parentID: 1, percentComplete: 77, isMilestone: false, order:2},
        ];

        var saveResponse = {
            success: {
                status: 'success',
                message: '',
                id: 99,
                order: 1
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
