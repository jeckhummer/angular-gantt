(function () {
    angular.module('dialog').factory('DialogService', DialogService);

    function DialogService($rootScope) {
        var activeDialog = null;
        var blockingMode = false;

        var service = {
            getActiveDialog: getActiveDialog,
            toggleDialog: toggleDialog,
            isActiveDialog: isActiveDialog,
            isActive: isActive,
            deactivate: deactivate,
            isInBlockingMode: isInBlockingMode
        };
        return service;

        function getActiveDialog(){
            return activeDialog;
        }

        function toggleDialog(dialogName, arg, block) {
            if (activeDialog == dialogName) {
                activeDialog = null;
                $rootScope.$broadcast(`${dialogName}-closed`, arg);
            } else {
                activeDialog = dialogName;
                blockingMode = block;
                $rootScope.$broadcast(`${dialogName}-opened`, arg);
            }
        }

        function isActiveDialog(dialogName) {
            return activeDialog === dialogName;
        }

        function isInBlockingMode(){
            return blockingMode;
        }

        function isActive() {
            return activeDialog != null;
        }

        function deactivate() {
            activeDialog = null;
        }
    }
})();