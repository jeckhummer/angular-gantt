(function(){
    angular.module('gantt').controller('StatusBarController', StatusBarController);

    function StatusBarController ($rootScope, $scope, $q, $timeout) {
        var ctrl = this;
        var fadeTimeout = 3000;
        var notificationStack = [];
        var lastNoFadeNotification;

        $rootScope.$on('notify', pushNotification);
        $rootScope.$on('notify-fade', pushFadeNotification);
        $rootScope.$on('notify-timeout-fade', pushTimeoutFadeNotification);

        $scope.$watchCollection(
            function(){
                return notificationStack.map(function(notification){
                    return notification.toDelete;
                });
            },
            function(){
                var ntf = getActiveNotification();
                ctrl.notification = ntf;
            }
        );

        function getActiveNotification(){
            var ntf = {};

            // last notification with toDelete == false
            notificationStack.forEach(function(notification){
                if(!notification.toDelete) ntf = notification;
            });

            return ntf;
        }

        function pushNotification(event, message, isError){
            deleteNotification(lastNoFadeNotification);
            lastNoFadeNotification = _pushNotification(message, $q.reject(), isError);
        }

        function pushFadeNotification(event, message, promise, isError){
            _pushNotification(message, promise, isError);
        }

        function pushTimeoutFadeNotification(event, message, isError){
            var promise = $q(function (resolve) {
                $timeout(resolve, fadeTimeout);
            });
            _pushNotification(message, promise, isError);
        }

        function _pushNotification(message, promise, isError){
            var notification = {
                message: message,
                toDelete: false,
                isError: isError
            };
            notificationStack.push(notification);

            $q.when(promise).then(function(){
                deleteNotification(notification);
            });

            return notification;
        }

        function deleteNotification(notification){
            if(notification) notification.toDelete = true;
        }
    }
})();