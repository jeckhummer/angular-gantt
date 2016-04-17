(function () {
    angular.module('app-dev').value('GanttBaselinesTestData', getGanttBaselinesTestData());
    function getGanttBaselinesTestData() {
        var baselines = {
            'Saved Baseline 1': [
                {id: 1, name: "Task 1", start: "2015-10-20", end: "2016-11-10", parentID: 0},
                {id: 2, name: "SubTask A", start: "2015-09-20", end: "2016-02-01", parentID: 1},
                {id: 3, name: "SubTask B", start: "2016-06-01", end: "2016-08-16", parentID: 1},
                {id: 4, name: "SubTask C", start: "2016-08-16", end: "2016-11-10", parentID: 1},
                {id: 5, name: "Task 2", start: "2016-05-22", end: "2016-12-27", parentID: 0},
                { id: 6, name: "Sub Milestone A long name bla bla bla", start: "2016-05-22", end: "2016-05-22", parentID: 5},
                {id: 7, name: "SubTask A", start: "2016-05-22", end: "2016-06-15", parentID: 5},
                {id: 10, name: "Sub Milestone B", start: "2016-12-01", end: "2016-12-01", parentID: 5}
            ],
            'Saved Baseline 2': [
                {id: 1, name: "Task 1", start: "2015-12-20", end: "2016-11-10", parentID: 0},
                {id: 2, name: "SubTask A", start: "2015-12-20", end: "2016-04-01", parentID: 1},
                {id: 3, name: "SubTask B", start: "2016-04-01", end: "2016-08-16", parentID: 1},
                {id: 4, name: "SubTask C", start: "2016-08-16", end: "2016-11-10", parentID: 1},
                {id: 5, name: "Task 2", start: "2016-05-22", end: "2016-12-02", parentID: 0},
                { id: 6, name: "Sub Milestone A long name bla bla bla", start: "2016-05-22", end: "2016-05-22", parentID: 5},
                {id: 7, name: "SubTask A", start: "2016-05-22", end: "2016-06-29", parentID: 5},
                {id: 8, name: "SubTask B", start: "2016-06-29", end: "2016-11-10", parentID: 5},
                {id: 9, name: "SubTask C", start: "2016-11-10", end: "2016-12-01", parentID: 5},
                {id: 10, name: "Sub Milestone B", start: "2016-12-01", end: "2016-12-01", parentID: 5}
            ]
        };

        var mock = {
            baselines: baselines,
            //saveResponse: saveResponse
        };
        return mock;
    }
})();