angular.module('test').controller('testController', function($scope){
    var ctrl = this;
    ctrl.width = 50;
    var tmp = 0;

    $scope.$on('angular-resizable.resizing', function (event, info) {
        $scope.$apply(function () {
            ctrl.width = info.width;
        });
        tmp++;
        console.clear();
        console.log(tmp);
    })
});