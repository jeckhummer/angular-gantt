(function () {
    angular.module('gantt').service('GanttTaskFactoryService', GanttTaskFactoryService);

    function GanttTaskFactoryService(DateService) {
        this.create = (data)=> new Task(data);

        function Task(data) {
            var task = this;

            task.setStartDate = setStartDate;
            task.setEndDate = setEndDate;

            init(data);

            function init(data) {
                Object.assign(task, data);
                task.setStartDate(task.start);
                task.setEndDate(task.end);
            }

            // подразумевается, что изначально данные приходят в стороковом формате (с сервера)
            function setStartDate(dateStr) {
                task.start = dateStr;
                task.startMoment = DateService.createMoment(task.start);
                task.startDate = DateService.createDate(dateStr);
                initDateInterval();
            }

            function setEndDate(dateStr) {
                task.end = dateStr;
                task.endMoment = DateService.createMoment(task.end);
                task.endDate = DateService.createDate(dateStr);
                initDateInterval();
            }

            function initDateInterval() {
                if(task.startMoment && task.endMoment)
                    task.dateInterval = DateService.createDateInterval(task.startMoment, task.endMoment);
            }
        }
    }
})();
