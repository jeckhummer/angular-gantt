(function(){
    angular.module('gantt').controller('TimelineOptionsController', TimelineOptionsController);

    function TimelineOptionsController ($scope, $rootScope, $q, TimelineService,
                                        DialogService, NotificationService) {
        var ctrl = this;
        var timelineDefer = $q.defer();

        ctrl.save = save;
        $scope.$on('timeline-config-changed', TimelineConfigChangesHandler);
        $scope.$on('options.save', save);

        var suppressOK = true;
        NotificationService.notify('Loading user timeline settings', timelineDefer.promise, suppressOK);

        function TimelineConfigChangesHandler(){
            timelineDefer.resolve();
        }

        function save(){
            var promise = TimelineService.saveConfig().then(function () {
                DialogService.toggleDialog('settings');
            });
            NotificationService.notify('Saving timeline settings', promise);
        }
    }
})();