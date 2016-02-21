/**
 * Created by Maksim on 2/21/2016.
 */

var ganttTestData = [
    {
        id: 1,
        name: "Task 1",
        date: {
            start: "2015-12-20",
            end: "2016-11-10"
        },
        parent_id: 0,
        percent_complete: 66,
    },
    {
        id: 2,
        name: "SubTask A",
        date: {
            start: "2015-12-20",
            end: "2016-04-01"
        },
        parent_id: 1,
        percent_complete: 100,
    },
    {
        id: 3,
        name: "SubTask B",
        date: {
            start: "2016-04-01",
            end: "2016-08-16"
        },
        parent_id: 1,
        percent_complete: 77,
    },
    {
        id: 4,
        name: "SubTask C",
        date: {
            start: "2016-08-16",
            end: "2016-11-10"
        },
        parent_id: 1,
        percent_complete: 11,
    },
    {
        id: 5,
        name: "Task 2",
        date: {
            start: "2016-05-22",
            end: "2016-12-02"
        },
        parent_id: 0,
        percent_complete: 50,
    },
    {
        id: 6,
        name: "Sub Millestone A",
        date: {
            start: "2016-05-22",
            end: "2016-05-22"
        },
        parent_id: 5,
        percent_complete: 100,
    },
    {
        id: 7,
        name: "SubTask A",
        date: {
            start: "2016-05-22",
            end: "2016-06-29"
        },
        parent_id: 5,
        percent_complete: 33,
    },
    {
        id: 8,
        name: "SubTask B",
        date: {
            start: "2016-06-29",
            end: "2016-11-10"
        },
        parent_id: 5,
        percent_complete: 39,
    },
    {
        id: 9,
        name: "SubTask C",
        date: {
            start: "2016-11-10",
            end: "2016-12-01"
        },
        parent_id: 5,
        percent_complete: 88,
    },
    {
        id: 10,
        name: "Sub Millestone B",
        date: {
            start: "2016-12-01",
            end: "2016-12-01"
        },
        parent_id: 5,
        percent_complete: 0,
    },
];