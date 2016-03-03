(function () {
    angular.module('app-dev').value('GanttTimelineMock', GanttTimelineMock());

    function GanttTimelineMock() {
        var options = [
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

        var mock = {
            options: options,
            response: response
        };
        return mock;
    }
})();