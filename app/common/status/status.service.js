'use strict';
(function () {
    angular.module('common.status').factory('StatusService', StatusService);

    function StatusService($q, $timeout) {
        var currentNotification = null;
        var FADE_TIMEOUT = 3000;
        var notificationStack = [];
        var lastNoFadeNotification;

        var service = {
            getNotification: getNotification,
            notify: notify,
            notifyFade: notifyFade,
            notifyTimeoutFade: notifyTimeoutFade
        };
        return service;

        function getNotification() {
            return currentNotification;
        }

        function notify(message, isError){
            _deleteNotification(lastNoFadeNotification);
            lastNoFadeNotification = _pushNotification(message, $q.reject(), isError);
        }

        function notifyFade(message, promise, isError){
            _pushNotification(message, promise, isError);
        }

        function notifyTimeoutFade(message, isError){
            var promise = $q(function (resolve) {
                $timeout(resolve, FADE_TIMEOUT);
            });
            _pushNotification(message, promise, isError);
        }

        function _deleteNotification(notification){
            var index = notificationStack.indexOf(notification);
            notificationStack.splice(index, 1);

            _initActiveNotification();
        }

        function _initActiveNotification(){
            currentNotification = notificationStack[notificationStack.length - 1];
        }

        function _pushNotification(message, promise, isError){
            var notification = {
                message: message,
                isError: isError
            };
            notificationStack.push(notification);

            $q.when(promise).then(function(){
                _deleteNotification(notification);
            });

            _initActiveNotification();
            return notification;
        }
    }
})();