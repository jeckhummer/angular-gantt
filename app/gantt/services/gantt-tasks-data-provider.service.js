'use strict';
(function () {
    angular.module('gantt').factory('GanttTasksDataProviderService', GanttTasksDataProviderService);

    function GanttTasksDataProviderService(HttpService) {
        var service = {
            getTasks: getTasks,
            updateTask: updateTask,
            addTask: addTask,
            deleteTask: deleteTask,
            moveTaskUp: moveTaskUp,
            moveTaskDown: moveTaskDown
        };
        return service;

        function getTasks(){
            return HttpService.getResource('gantt-tasks');
        }

        function addTask(task){
            console.log('adding gantt task: ', task);
            var promise = HttpService.postResource('gantt-task', task);

            promise.then(function (serverData) {
                task.id = serverData.id;
                task.order = serverData.order;
                return task;
            });

            return promise;
        }

        function updateTask(){
            console.log('updating gantt task: ', task);
            var promise = HttpService.postResource('gantt-task', task);

            return promise;
        }

        function deleteTask(id){

        }

        function moveTaskUp(){
            return HttpService.postResource('gantt-task', task);
        }

        function moveTaskDown(){
            return HttpService.postResource('gantt-task', task);
        }
    }
})();

