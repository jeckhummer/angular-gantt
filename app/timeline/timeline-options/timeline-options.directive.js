'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineOptions', TimelineOptionsDirective);

    function TimelineOptionsDirective(URLLocaleService, TimelineService, $rootScope) {
        var directive = {
            templateUrl: URLLocaleService.getURL('timeline.options'),
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
                    $scope.config.forEach(function (type) {
                        type.stripes = type.stripes === "true" || type.stripes === "True" || type.stripes === true;
                    });
                    $scope.stripesTypeName = getStripesTypeIndex();
                }

                function setStripesType(typeIndex){
                    $scope.config.forEach((elem, ind) => elem.stripes = ind == typeIndex);
                }

                function getStripesTypeIndex() {
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