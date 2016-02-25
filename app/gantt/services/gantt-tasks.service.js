(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService (GanttDataHTTPService, $rootScope, $q) {
        var tasks = [];
        var boundaries;

        var service = {
            getBoundaries: getBoundaries,
            getAll: getAll,
            isEmpty: isEmpty,
        };
        activate();
        return service;


        function getBoundaries() {
            return boundaries;
        }

        function getAll() {
            return tasks;
        }

        function isEmpty(){
            return tasks.length == 0;
        }

        function activate() {
            reload();
        }

        function reload(){
            GanttDataHTTPService.getTasks()
                .then(processTasksData)
                .then(calculateBoundaries)
                .then(notifyAboutChanges);
        }

        function processTasksData(data){
            tasks.length = 0;
            angular.forEach(data, function (task_data) {
                var task = generateTask(task_data);
                tasks.push(task);
            });
        }

        function generateTask(data){
            var di = new DateInterval(
                moment(data.date.start, 'YYYY-MM-DD'),
                moment(data.date.end, 'YYYY-MM-DD')
            );
            var task = {
                name: data.name,
                id: data.id,
                dateInterval: di,
                parentId: data.parentID,
                percentComplete: data.percentComplete,
            };
            return task;
        }

        function notifyAboutChanges(){
            $rootScope.$broadcast('gantt-tasks-data-changed');
        }

        function calculateBoundaries(){
            var starts = [];
            var ends = [];

            angular.forEach(tasks, function(task){
                starts.push(task.dateInterval.start);
                ends.push(task.dateInterval.end);
            });

            boundaries = new DateInterval(moment.min(starts), moment.max(ends));
        }
    }
})();