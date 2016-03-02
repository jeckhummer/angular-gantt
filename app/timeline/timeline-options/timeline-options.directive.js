'use strict';
(function () {
    angular.module('timeline')
        .directive('timelineOptions', TimelineOptionsDirective);

    function TimelineOptionsDirective() {
        var directive = {
            templateUrl: 'timeline/timeline-options/timeline-options.directive.html',
            restrict: 'E',
            scope: {
                'config': '=',
                'onSave': '&',
                'onBack': '&'
            },
            link: function (scope) {
                scope.stripesTypeName = getStripesTypeIndex();
                scope.saveConfig = scope.onSave();
                scope.back = scope.onBack();
                scope.$watch('stripesTypeName', setStripesType);

                function setStripesType(typeIndex){
                    scope.config.forEach(function(elem, ind){
                        elem.stripes = ind == typeIndex;
                    });
                }

                function getStripesTypeIndex(){
                    for(var i in scope.config){
                        if(isStripesType(scope.config[i])){
                            return i;
                        }
                    }
                }

                function isStripesType(type){
                    return type.stripes;
                }
            }
        };
        return directive;
    }
})();