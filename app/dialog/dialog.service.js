(function () {
    angular.module('dialog').factory('DialogService', DialogService);

    function DialogService($rootScope) {
        var activeDialog = null;
        var blockingMode = false;

        var service = {
            getActiveDialog: getActiveDialog,
            toggleDialog: toggleDialog,
            activateDialog: activateDialog,
            deactivateDialog: deactivateDialog,
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
            if (!isActiveDialog(dialogName)) {
                activateDialog(dialogName, arg, block);
            } else {
                deactivateDialog(dialogName);
            }
        }

        function activateDialog(dialogName, arg, block){
            activeDialog = dialogName;
            blockingMode = block;
            $rootScope.$broadcast(`${dialogName}-opened`, arg);
        }

        function deactivateDialog(dialogName){
            deactivate();
            $rootScope.$broadcast(`${dialogName}-closed`, arg);
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