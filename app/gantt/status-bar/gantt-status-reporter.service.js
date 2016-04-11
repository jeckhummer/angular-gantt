'use strict';
(function () {
    angular.module('gantt').factory('GanttStatusReporterService', GanttStatusReporterService);

    function GanttStatusReporterService($rootScope, $q, DialogService) {
        var SUCCESS_SUFFIX = 'SUCCEED.';
        var FAIL_SUFFIX = 'FAILED!';
        var service = {
            trackDialog: trackDialog
        };
        return service;

        function trackDialog(promise, descr, dialogName, keepDialogOpen){
            var _promise = promise.then(function(response){
                return response.status == "success" ?
                    $q.resolve(response.message):
                    $q.reject(response.message);
            }).then(function (){
                var msg = `${descr} ${SUCCESS_SUFFIX}`;
                $rootScope.$broadcast('notify-timeout-fade', msg);

                if(keepDialogOpen){
                    DialogService.toggleDialog(dialogName);
                }
            }, function (message){
                var msg = `${descr} ${FAIL_SUFFIX} ${message}`;
                $rootScope.$broadcast('notify', msg, true);
            });

            if(!keepDialogOpen){
                DialogService.toggleDialog(dialogName);
            }
            $rootScope.$broadcast('notify-fade', `${descr}...`, _promise.catch());
        }
    }
})();

