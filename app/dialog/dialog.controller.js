(function () {
    angular.module('dialog').controller('DialogController', DialogController);

    function DialogController($rootScope, $scope) {
        var ctrl = this;
        ctrl.activeDialog = null;
        ctrl.toggle = toggle;
        ctrl.dialogIsActive = dialogIsActive;
        ctrl.isActive = isActive;
        ctrl.deactivate = deactivate;

        $scope.$on('dialog-toggle', function(even, dialogName, arg){
            ctrl.toggle(dialogName, arg);
        });

        function toggle(dialogName, arg) {
            if(ctrl.activeDialog == dialogName){
                ctrl.activeDialog = null;
                $rootScope.$broadcast(`${dialogName}-closed`, arg);
            }else{
                ctrl.activeDialog = dialogName;
                $rootScope.$broadcast(`${dialogName}-opened`, arg);
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