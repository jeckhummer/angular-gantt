(function () {
    angular.module('dialog').controller('DialogBackgroundController', DialogBackgroundController);

    function DialogBackgroundController(DialogService) {
        var ctrl = this;
        ctrl.activeDialog = DialogService.getActiveDialog();
        ctrl.toggle = toggle;
        ctrl.dialogIsActive = dialogIsActive;
        ctrl.isActive = isActive;
        ctrl.deactivate = deactivate;

        function toggle(dialogName, arg) {
            DialogService.toggleDialog(dialogName, arg);
        }

        function dialogIsActive(dialogName){
            return DialogService.isActiveDialog(dialogName);
        }

        function isActive(){
            return DialogService.isActive();
        }

        function deactivate(){
            DialogService.deactivate();
        }
    }
})();