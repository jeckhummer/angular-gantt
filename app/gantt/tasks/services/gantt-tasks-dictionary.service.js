(function () {
    angular.module('gantt').factory('GanttTasksDictionaryService', GanttTasksDictionaryService);

    function GanttTasksDictionaryService() {
        var dictionary = new IDDictionary(TaskIDProvider);
        return dictionary;

        function TaskIDProvider(task){
            return task.id;
        }
    }
})();