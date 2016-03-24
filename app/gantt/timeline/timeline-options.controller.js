(function(){
    angular.module('gantt').controller('TimelineOptionsController', TimelineOptionsController);

    function TimelineOptionsController ($scope, $rootScope, $q, TimelineService, DialogService) {
        var ctrl = this;
        var timelineDefer = $q.defer();

        ctrl.save = save;
        ctrl.back = back;
        ctrl.config = TimelineService.getConfig();

        $scope.$on('timeline-config-changed', TimelineConfigChangesHandler);

        $rootScope.$broadcast('notify-fade', 'Loading user timeline settings ...', timelineDefer.promise);

        function TimelineConfigChangesHandler(){
            ctrl.timelineConfig = TimelineService.getConfig();
            timelineDefer.resolve();
        }

        function save(){
            var promise = TimelineService.saveConfig().then(function(response){
                return response.status == "success" ?
                    $q.resolve(response.message):
                    $q.reject(response.message);
            }).then(function (){
                var msg = `Saving timeline settings SUCCEED!`;
                $rootScope.$broadcast('notify-timeout-fade', msg);
            }, function (message){
                var msg = `Saving timeline settings FAILED! Error: ${message}`;
                $rootScope.$broadcast('notify', msg, true);
            });

            $rootScope.$broadcast('notify-fade', 'Saving timeline settings...', promise.catch());
            toggleDialog();
        }

        function back(){
            console.log('going back...');
            toggleDialog();
        }

        function toggleDialog(){
            DialogService.toggleDialog('settings');
        }
    }
})();