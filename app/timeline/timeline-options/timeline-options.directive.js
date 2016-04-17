'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineOptions', TimelineOptionsDirective);

    function TimelineOptionsDirective(TimelineService, $rootScope) {
        var directive = {
            templateUrl: 'jsWidgets/angular-gantt/app/timeline/timeline-options/timeline-options.directive.html',
            restrict: 'E',
            scope: {
                'onSave': '&',
                'onBack': '&'
            },
            link: function ($scope) {
                initOptions();

                $scope.saveConfig = $scope.onSave();
                $scope.back = $scope.onBack();
                $scope.notifyAboutChanges = notifyAboutChanges;
                $scope.onStripesTypeChange = onStripesTypeChange;

                $scope.$on('timeline-config-changed', initOptions);

                function initOptions(){
                    $scope.config = TimelineService.getConfig();
                    $scope.stripesTypeName = getStripesTypeIndex();
                }

                function setStripesType(typeIndex){
                    $scope.config.forEach((elem, ind) => elem.stripes = ind == typeIndex);
                }

                function getStripesTypeIndex(){
                    for(var i in $scope.config){
                        if(isStripesType($scope.config[i])){
                            return i;
                        }
                    }
                }

                function isStripesType(type){
                    return type.stripes;
                }

                function notifyAboutChanges(){
                    $rootScope.$broadcast('timeline-config-changed');
                }

                function onStripesTypeChange(){
                    setStripesType($scope.stripesTypeName);
                    notifyAboutChanges();
                }
            }
        };
        return directive;
    }
})();