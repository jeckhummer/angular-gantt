(function () {
    angular.module('dialog').controller('DialogBackgroundController', DialogBackgroundController);

    function DialogBackgroundController(DialogService) {
        var ctrl = this;
        ctrl.activeDialog = DialogService.getActiveDialog();
        ctrl.toggle = toggle;
        ctrl.dialogIsActive = dialogIsActive;
        ctrl.isActive = isActive;
        ctrl.onClick = onClick;

        function toggle(dialogName, arg) {
            DialogService.toggleDialog(dialogName, arg);
        }

        function dialogIsActive(dialogName){
            return DialogService.isActiveDialog(dialogName);
        }

        function isActive(){
            return DialogService.isActive();
        }

        function onClick(){
            var inBlockingMode = DialogService.isInBlockingMode();
            if(!inBlockingMode){
                deactivate();
            }
        }

        function deactivate(){
            DialogService.deactivate();
        }
    }
})();