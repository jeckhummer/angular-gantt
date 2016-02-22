/**
 * Created by Maksim on 2/21/2016.
 */

angular.module('timeline').service('TimelineTypes', function () {
    this.year = {
        generate_first_boundaries: function (date) {
            var result = new DateInterval(
                moment(date).startOf('year'),
                moment(date).endOf('year')
            );
            return result;
        },
        generate_next_boundaries: function (date_interval) {
            var result = new DateInterval(
                date_interval.start.add(1, 'year'),
                date_interval.end.add(1, 'year')
            );
            return result;
        },
        generate_init_index: function (date_interval) {
            return date_interval.start.get('year');
        },
        generate_index: function (date_interval, index) {
            return ++index;
        },
        render_label: function (index) { return index; }
    };

    this.week = (function () {
        var year_edge_week = false;
        return {
            generate_first_boundaries: function (date) {
                var result = new DateInterval(
                    moment(date).startOf('week'),
                    moment(date).endOf('week')
                );
                return result;
            },
            generate_next_boundaries: function (date_interval) {
                var result = new DateInterval(
                    date_interval.start.add(1, 'week'),
                    date_interval.end.add(1, 'week')
                );
                return result;
            },
            generate_init_index: function (date_interval) {
                return date_interval.start.week();
            },
            generate_index: function (date_interval, index) {
                if (year_edge_week) {
                    year_edge_week = false;
                    return 1;
                } else {
                    if (date_interval.start.get('year') < date_interval.end.get('year'))
                        year_edge_week = true;
                    return index + 1;
                }
            },
            render_label: function (index) { return index; },
        };
    } ());

    this.month = {
        generate_first_boundaries: function (date) {
            var start = moment(date).startOf('month');
            var end = moment(date).endOf('month');
            var result = new DateInterval(
                start, end
            );
            return result;
        },
        generate_next_boundaries: function (date_interval) {
            var next_month_start = moment(date_interval.start).add(1, 'month');
            var next_month_end = moment(next_month_start).endOf('month');
            var result = new DateInterval(
                next_month_start,
                next_month_end
            );
            return result;
        },
        generate_init_index: function (date_interval) {
            return date_interval.start.get('month');
        },
        generate_index: function (date_interval, index) {
            return ++index;
        },
        render_label: function (index) {
            return moment.monthsShort('MMM', index % 12);
        },
    };

    this.halfmonth = {
        generate_first_boundaries: function (date) {
            var month_start = moment(date).startOf('month');
            var month_end = moment(date).endOf('month');

            var result = date.diff(month_start, 'days') > 14 ?
                new DateInterval(moment(month_start).add(15, 'days'), month_end) :
                new DateInterval(month_start, moment(month_start).add(14, 'days'));
            return result;
        },
        generate_next_boundaries: function (date_interval) {
            var start = moment(date_interval.start);
            var month_start = moment(start).startOf('month');
            var month_end = moment(start).endOf('month');
            var next_month_start = moment(month_start).add(1, 'month');

            var result = start.date() == 1 ?
                new DateInterval(moment(month_start).add(15, 'days'), month_end) :
                new DateInterval(next_month_start, moment(next_month_start).add(14, 'days'));
            return result;
        },
        generate_init_index: function (date_interval) {
            var start = moment(date_interval.start);
            var result = {
                month: start.month(),
                half: start.date() == 1 ? 1 : 2
            };
            return result;
        },
        generate_index: function get_index(date_interval, index) {
            var result = {
                month: index.month + (index.half == 2 ? 1 : 0),
                half: index.half == 2 ? 1 : 2
            };
            return result;
        },
        render_label: function (index) {
            var result = moment.monthsShort('MMM', index.month % 12) + '<br />' + index.half + '/1';
            return result;
        },
    };
});