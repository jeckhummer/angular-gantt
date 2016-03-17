(function () {
    angular.module('dialog').controller('DialogTriggerController', DialogTriggerController);

    function DialogTriggerController(DialogService) {
        var ctrl = this;
        ctrl.isActive = isActive;
        ctrl.toggle = toggle;

        //$scope.$on('dialog-toggle', onDialogToggle);

        function toggle(){
            DialogService.toggleDialog(ctrl.dialogName, ctrl.arg, ctrl.group);
        }

        //function onDialogToggle(event, dialogName){
        //    ctrl.isActive = dialogName == ctrl.dialogName;
        //}

        function isActive(){
            return DialogService.isActiveDialog(ctrl.dialogName);
        }
    }
})();