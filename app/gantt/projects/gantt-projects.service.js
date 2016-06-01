'use strict';
(function () {
    angular.module('gantt').factory('GanttProjectsService', GanttProjectsService);

    function GanttProjectsService(GanttProjectsDataProviderService, $rootScope) {
        var _projectsDictionary = {};

        var service = {
            isEmpty: () => _projectsDictionary.isEmpty(),
            getProject: id => {
                return _projectsDictionary.get(id)[0];
            },
            reload: function reload(){
                _setState('loading');

                GanttProjectsDataProviderService.getProjects().then(
                    function (data) {
                        _projectsDictionary = new Dictionary(data);
                        _setState('ready')
                    },
                    function (){
                        _setState('error');
                    }
                );
            }
        };

        service.reload();
        return service;

        function _setState(state){
            service.state = state;
            $rootScope.$broadcast('gantt.projects.state-changed', state);
        }
    }
})();