(function () {
    angular.module('gantt').factory('GanttTasksService', GanttTasksService);

    function GanttTasksService(GanttTaskFactoryService, GanttDataHTTPService, $rootScope) {
        var tasks = [];
        var newID = 1;

        var service = {
            getAll: getAll,
            isEmpty: isEmpty,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            getTask: getTask,
            getTasksCount: getTasksCount,
            getTasksNames: getTasksNames
        };

        init();
        return service;

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

        function deleteTask(id){
            tasks.forEach((task, i)=>{
                if(task.id == id) tasks.splice(i, 1);
            });

            onTaskChanges();
        }

        function addTaskLocally(data) {
            data = angular.isArray(data) ? data : [data];

            angular.forEach(data, function (taskData) {
                var task = GanttTaskFactoryService.create(taskData);
                tasks.push(task);

                if (newID <= task.id) newID = task.id + 1;
            });

            onTaskChanges();
        }

        function updateTask(data) {
            updateTaskLocally(data);
            return GanttDataHTTPService.saveTask(data);
        }

        function updateTaskLocally(data) {
            var index = searchTaskByID(data.id);
            tasks[index] = data;
            onTaskChanges();
        }

        function onTaskChanges() {
            $rootScope.$broadcast('tasks-changed');
        }

        function getTasksCount(){
            return tasks.length;
        }

        function getTasksNames(){
            return tasks.map((task)=>task.name);
        }
    }
})();