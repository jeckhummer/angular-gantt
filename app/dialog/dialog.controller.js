(function () {
    angular.module('dialog').controller('DialogController', DialogController);

    function DialogController($scope) {
        var ctrl = this;
        ctrl.activeDialog = null;
        ctrl.toggle = toggle;
        ctrl.dialogIsActive = dialogIsActive;
        ctrl.isActive = isActive;
        ctrl.deactivate = deactivate;

        $scope.$on('dialog-toggle', function(even, dialogName){
            ctrl.toggle(dialogName);
        });

        function toggle(dialogName) {
            if(ctrl.activeDialog == dialogName){
                ctrl.activeDialog = null;
                $scope.$broadcast(`${dialogName}-closed`);
            }else{
                ctrl.activeDialog = dialogName;
            }
        }

        function dialogIsActive(dialogName){
            return ctrl.activeDialog === dialogName;
        }

        function isActive(){
            return ctrl.activeDialog != null;
        }

        function deactivate(){
            ctrl.activeDialog = null;
        }
    }
})();