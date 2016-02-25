/**
 * Created by Maksim on 2/21/2016.
 */

describe('date interval position', function () {
    it('should calculate left margin and width', function () {
        var position = DateIntervalPosition(
            new DateInterval(moment('2000-01-01','YYYY-MM-DD'), moment('2000-01-10','YYYY-MM-DD')), // overall interval
            new DateInterval(moment('2000-01-03','YYYY-MM-DD'), moment('2000-01-08','YYYY-MM-DD'))
        );

        expect(position).toEqual({width: 60, left: 20 });
    });
});