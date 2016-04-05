(function () {
    angular.module('dialog').controller('DialogTriggerController', DialogTriggerController);

    function DialogTriggerController(DialogService) {
        var ctrl = this;
        ctrl.isActive = isActive;
        ctrl.toggle = toggle;

        function toggle(){
            DialogService.toggleDialog(ctrl.dialogName, ctrl.arg, ctrl.group);
        }

        function isActive(){
            return DialogService.isActiveDialog(ctrl.dialogName);
        }
    }
})();