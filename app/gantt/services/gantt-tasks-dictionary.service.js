(function () {
    angular.module('gantt').factory('GanttTasksDictionaryService', GanttTasksDictionaryService);

    function GanttTasksDictionaryService(IDDictionaryFactoryService) {
        var dictionary = IDDictionaryFactoryService.create(TaskIDProvider);
        return dictionary;

        function TaskIDProvider(task){
            return task.id;
        }
    }
})();