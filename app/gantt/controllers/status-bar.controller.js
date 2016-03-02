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
                ctrl.message = getActiveMessage();
            }
        );

        function getActiveMessage(){
            var msg = '';

            // last notification with toDelete == false
            notificationStack.forEach(function(notification){
                if(!notification.toDelete) msg = notification.message;
            });

            return msg;
        }

        function pushNotification(event, message){
            deleteNotification(lastNoFadeNotification);
            lastNoFadeNotification = _pushNotification(message);
        }

        function pushFadeNotification(event, message, promise){
            _pushNotification(message, promise);
        }

        function pushTimeoutFadeNotification(event, message){
            var promise = $q(function (resolve) {
                $timeout(resolve, fadeTimeout);
            });
            _pushNotification(message, promise);
        }

        function _pushNotification(message, promise){
            var notification = {
                message: message,
                toDelete: false
            };
            notificationStack.push(notification);

            $q.when(promise).then(function(){
                deleteNotification(notification);
            });

            return notification;
        }

        function deleteNotification(notification){
            notification.toDelete = true;
        }
    }
})();