(function () {
    angular.module('dev.gantt.mocks').value('GanttTimelineTestData', getGanttTimelineTestData());

    function getGanttTimelineTestData() {
        var timelineConfig = [
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

        var response = {
            success: {
                status: 'success',
                message: ''
            },
            error: {
                status: 'error',
                message: 'Shit happens!'
            },
        };

        var testData = {
            timelineConfig: timelineConfig,
            response: response
        };
        return testData;
    }
})();