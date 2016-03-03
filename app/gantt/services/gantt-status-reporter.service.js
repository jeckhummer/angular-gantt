'use strict';
(function () {
    angular.module('gantt').factory('GanttStatusReporterService', GanttStatusReporterService);

    function GanttStatusReporterService($rootScope, $q) {
        var SUCCESS_SUFFIX = 'SUCCEED.';
        var FAIL_SUFFIX = 'FAILED!';
        var service = {
            trackDialog: trackDialog
        };
        return service;

        function trackDialog(promise, descr, dialogName){
            var _promise = promise.then(function(response){
                return response.status == "success" ?
                    $q.resolve(response.message):
                    $q.reject(response.message);
            }).then(function (){
                var msg = `${descr} ${SUCCESS_SUFFIX}`;
                $rootScope.$broadcast('notify-timeout-fade', msg);
            }, function (message){
                var msg = `${descr} ${FAIL_SUFFIX} ${message}`;
                $rootScope.$broadcast('notify', msg, true);
            });

            $rootScope.$broadcast('dialog-toggle', dialogName);
            $rootScope.$broadcast('notify-fade', `${descr}...`, _promise.catch());
        }
    }
})();

