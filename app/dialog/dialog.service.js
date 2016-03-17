(function () {
    angular.module('dialog').factory('DialogService', DialogService);

    function DialogService($rootScope) {
        var activeDialog = null;

        var service = {
            getActiveDialog: getActiveDialog,
            toggleDialog: toggleDialog,
            isActiveDialog: isActiveDialog,
            isActive: isActive,
            deactivate: deactivate
        };
        return service;

        function getActiveDialog(){
            return activeDialog;
        }

        function toggleDialog(dialogName, arg) {
            if (activeDialog == dialogName) {
                activeDialog = null;
                $rootScope.$broadcast(`${dialogName}-closed`, arg);
            } else {
                activeDialog = dialogName;
                $rootScope.$broadcast(`${dialogName}-opened`, arg);
            }
        }

        function isActiveDialog(dialogName) {
            return activeDialog === dialogName;
        }

        function isActive() {
            return activeDialog != null;
        }

        function deactivate() {
            activeDialog = null;
        }
    }
})();