// TASKS:
// select - you sent array of Objects (see below)
var tasks = [
    { id: 5, name: "Task 2", start: "2016-05-22", end: "2016-12-02", parentID: null, percentComplete: 50, isMilestone: false, order: 2},
    { id: 6, name: "SMS A", start: "2016-05-22", end: "2016-05-22", parentID: 5, percentComplete: 100, isMilestone: true, order:1}
];
// insert, update - you receive new/updated object : Object
// delete - you receive id : int
// ----------------------------------------------------------------------------------------------


// BASELINES:
// select - you sent dictionary of Objects (see below)
var baselines = {
    'Saved Baseline 1': [
        {id: 1, name: "Task 1", start: "2015-10-20", end: "2016-11-10", parentID: 0},
        {id: 2, name: "SubTask A", start: "2015-09-20", end: "2016-02-01", parentID: 1}
    ],
    'Saved Baseline 2': [
        {id: 1, name: "Task 1", start: "2015-12-20", end: "2016-11-10", parentID: 0},
        {id: 2, name: "SubTask A", start: "2015-12-20", end: "2016-04-01", parentID: 1}
    ]
};
// insert - you receive object : {name: '...', baseline: [Object, Object,...]}
// no update
// delete - you receive baseline's name : string
// ----------------------------------------------------------------------------------------------


// TIMELINE OPTIONS:
//select - you sent array of objects (see below)
var timelineOptions = [
    {
        typeName: 'year',
        label: 'Year',
        visible: true,
        stripes: false,
    },
    {
        typeName: 'month',
        label: 'Month',
        visible: true,
        stripes: false,
    },
    {
        typeName: 'half-month',
        label: 'Half Month',
        visible: false,
        stripes: true,
    },
    {
        typeName: 'week',
        label: 'Week',
        visible: false,
        stripes: false,
    }
];
// no insert
// update - you receive array of objects (see above)
// no delete
// ----------------------------------------------------------------------------------------------
