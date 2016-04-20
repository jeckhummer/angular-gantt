'use strict';
(function () {
    angular.module('common.date').factory('DateService', DateService);

    function DateService() {
        var today = moment().format('YYYY-MM-DD');

        var service = {
            format: format,
            createMoment: createMoment,
            createDate: createDate,
            createDateInterval: createDateInterval,
            createDateIntervalPosition: createDateIntervalPosition,
            toString: toString,
            today: today
        };
        return service;

        function createMoment(date){
            var _moment = moment.isDate(date) ? moment(date) : moment(date, 'YYYY-MM-DD');
            return _moment;
        }

        function createDate(dateStr){
            var date = createMoment(dateStr).toDate();
            return date;
        }

        function createDateInterval(date1, date2){
            return new DateInterval(date1, date2);
        }

        function createDateIntervalPosition(boundaries, dateInterval){
            return DateIntervalPosition(boundaries, dateInterval);
        }

        function format(dateStr){
            var date = createMoment(dateStr);
            var str = moment(date).format('D MMM YYYY');
            return str;
        }

        function toString(date){
            var str = moment(date).format('YYYY-MM-DD');
            return str;
        }
    }
})();

