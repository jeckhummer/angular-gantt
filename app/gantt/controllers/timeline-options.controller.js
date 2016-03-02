(function(){
    angular.module('gantt').controller('TimelineOptionsController', TimelineOptionsController);

    function TimelineOptionsController ($rootScope, $q, GanttTimelineService) {
        var ctrl = this;
        ctrl.save = save;
        ctrl.back = back;

        function save(){
            var promise = GanttTimelineService.saveConfig().then(function(response){
                return response.status == "success" ?
                    $q.resolve(response.message):
                    $q.reject(response.message);
            }).then(function (){
                var msg = `Saving timeline settings SUCCEED!`;
                $rootScope.$broadcast('notify-timeout-fade', msg);
            }, function (message){
                var msg = `Saving timeline settings FAILED! Error: ${message}`;
                $rootScope.$broadcast('notify-timeout-fade', msg);
            });

            $rootScope.$broadcast('notify-fade', 'Saving timeline settings...', promise.catch());
            toggleDialog();
        }

        function back(){
            console.log('going back...');
            toggleDialog();
        }

        function toggleDialog(){
            $rootScope.$broadcast('dialog-toggle', 'settings');
        }
    }
})();