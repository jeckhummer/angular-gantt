(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTaskFactoryService, GanttDataHTTPService, $rootScope, DateService) {
        var tasks = [];
        var newID = 1;
        var boundaries;

        var service = {
            getBoundaries: getBoundaries,
            getAll: getAll,
            isEmpty: isEmpty,
            updateTask: updateTask,
            addTask: addTask,
            getTask: getTask
        };

        init();
        return service;


        function getBoundaries() {
            return boundaries;
        }

        function getAll() {
            return tasks;
        }

        function searchTaskByID(id){
            var index;
            for (var i in tasks) {
                if (tasks[i].id == id) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        function getTask(id){
            var index = searchTaskByID(id);
            return tasks[index];
        }

        function isEmpty() {
            return tasks.length == 0;
        }

        function init() {
            reload();
        }

        function reload() {
            GanttDataHTTPService.getTasks()
                .then(clearTasks)
                .then(addTaskLocally);
        }

        function clearTasks(data) {
            tasks.length = 0;
            return data;
        }

        function addTask(data) {
            data.id = newID;
            addTaskLocally([data]);
            return GanttDataHTTPService.saveTask(data);
        }

        function addTaskLocally(data) {
            data = angular.isArray(data) ? data : [data];

            angular.forEach(data, function (taskData) {
                var task = GanttTaskFactoryService.create(taskData);
                tasks.push(task);

                if (newID <= task.id) newID = task.id + 1;
            });

            calculateBoundaries();
            notifyAboutChanges();
        }

        function updateTask(data) {
            updateTaskLocally(data);
            return GanttDataHTTPService.saveTask(data);
        }

        function updateTaskLocally(data) {
            var index = searchTaskByID(data.id);
            tasks[index] = data;
            calculateBoundaries();
            notifyAboutChanges();
        }

        function calculateBoundaries() {
            var starts = [];
            var ends = [];

            angular.forEach(tasks, function (task) {
                var start = DateService.createMoment(task.start);
                var end = DateService.createMoment(task.end);

                starts.push(start);
                ends.push(end);
            });

            boundaries = new DateInterval(moment.min(starts), moment.max(ends));
        }

        function notifyAboutChanges() {
            $rootScope.$broadcast('gantt-tasks-data-changed');
        }
    }
})();