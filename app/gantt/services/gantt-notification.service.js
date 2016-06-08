'use strict';
(function () {
    angular.module('gantt').factory('NotificationService', NotificationService);

    function NotificationService(DialogService, StatusService) {
        var service = {
            notify: notify,
            notifyLock: notifyLock
        };

        _init();
        return service;

        function _init() {
        }

        function notify(msg, promise, suppressOK) {
            var _msg = msg + '...';
            StatusService.notifyFade(_msg, promise);

            return promise.then(
                function () {
                    if (!suppressOK) {
                        var _msg = msg + ' SUCCEED!';
                        StatusService.notifyTimeoutFade(_msg);
                    }
                },
                function (error) {
                    var isError = true;
                    var _msg = msg + ' FAILED! error: ' + error;
                    StatusService.notify(_msg, isError);
                }
            );
        }

        function notifyLock(msg, promise, suppressOK) {
            DialogService.activateDialog('gantt-processing-lock', null, true);
            var _promise = notify(msg, promise, suppressOK).finally(function () {
                DialogService.deactivateDialog('gantt-processing-lock');
            });
            return _promise;
        }
    }
})();