(function () {
    angular.module('common.status').component('status', {
        template: `
            <span ng-show="$ctrl.getNotification().message">Status:</span>
            <span ng-style="{color: $ctrl.getNotification().isError ? 'red' : '#6DC36D'}">
                {{$ctrl.getNotification().message}}
            </span>
        `,
        controller: StatusController
    });

    function StatusController (StatusService) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.getNotification = StatusService.getNotification;
        }
    }
}());