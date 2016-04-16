    (function () {
    angular.module('gantt').service('GanttTaskFactoryService', GanttTaskFactoryService);

    function GanttTaskFactoryService(DateService) {
        this.create = (data)=> new Task(data);

        function Task(data) {
            var task = this;

            init(data);

            function init(data) {
                Object.assign(task, data);

                task.setStartDate = setStartDate;
                task.setEndDate = setEndDate;
                task.clone = clone;
                task.setPercentComplete = setPercentComplete;
                task.toggleAsMilestone = toggleAsMilestone;

                task.setStartDate(task.start);
                task.setEndDate(task.end);
                task.setPercentComplete(task.percentComplete);
            }

            // подразумевается, что изначально данные приходят в стороковом формате (с сервера)
            function setStartDate(dateStr) {
                task.start = dateStr;
                task.startMoment = DateService.createMoment(task.start);
                task.startDate = DateService.createDate(dateStr);
                calcDateInterval();
            }

            function setEndDate(dateStr) {
                task.end = dateStr;
                task.endMoment = DateService.createMoment(task.end);
                task.endDate = DateService.createDate(dateStr);
                calcDateInterval();
            }

            function setPercentComplete(val){
                task.percentComplete = val;
                calcIsCompleted();
            }

            function toggleAsMilestone(){
                task.setPercentComplete(task.percentComplete < 100 ? 100 : 0);
            }

            function calcIsCompleted(){
                task.isCompleted = task.percentComplete == 100;
            }

            function calcDateInterval() {
                if (task.startMoment && task.endMoment)
                    task.dateInterval = DateService.createDateInterval(task.startMoment, task.endMoment);
            }

            function clone() {
                return new Task(task);
            }
        }
    }
})();
