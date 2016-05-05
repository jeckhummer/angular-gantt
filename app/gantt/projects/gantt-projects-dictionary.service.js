(function () {
    angular.module('gantt').factory('GanttProjectsDictionaryService', GanttProjectsDictionaryService);

    function GanttProjectsDictionaryService() {
        var dictionary = new IDDictionary(ProjectIDProvider);
        return dictionary;

        function ProjectIDProvider(project){
            return project.id;
        }
    }
})();