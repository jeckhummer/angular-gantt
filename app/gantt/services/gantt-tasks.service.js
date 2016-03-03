(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService (GanttDataHTTPService, $rootScope, $q) {
        var tasks = [];
        var newID = 1;
        var boundaries;

        var service = {
            getBoundaries: getBoundaries,
            getAll: getAll,
            isEmpty: isEmpty,
            saveTask: saveTask
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
                .then(clearTasks)
                .then(addTasksFromData)
                .then(calculateBoundaries)
                .then(notifyAboutChanges);
        }

        function clearTasks(data){
            tasks.length = 0;
            return data;
        }

        function addTasksFromData(data){
            angular.forEach(data, function (task_data) {
                var task = generateTask(task_data);
                tasks.push(task);

                if(newID <= task.id) newID = task.id + 1;
            });
        }

        function generateTask(data){
            var di = new DateInterval(
                moment.isDate(data.date.start) ? moment(data.date.start) : moment(data.date.start, 'YYYY-MM-DD'),
                moment.isDate(data.date.end) ? moment(data.date.end) : moment(data.date.end, 'YYYY-MM-DD')
            );
            var task = {
                name: data.name,
                id: data.id,
                dateInterval: di,
                parentID: data.parentID,
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

        function saveTask(data){
            data.id = newID;
            addTasksFromData([data]);
            calculateBoundaries();
        }
    }
})();