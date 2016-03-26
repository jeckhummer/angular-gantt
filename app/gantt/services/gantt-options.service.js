'use strict';
(function () {
    angular.module('gantt').factory('GanttOptionsService', GanttOptionsService);

    function GanttOptionsService() {
        var INFO_BLOCK_MIN_WIDTH = 40;
        var INFO_BLOCK_MAX_WIDTH = 50;
        var infoBlockWidth = INFO_BLOCK_MIN_WIDTH;

        var service = {
            getInfoBlockWidth: getInfoBlockWidth,
            increaseInfoBlockWidth: increaseInfoBlockWidth,
            decreaseInfoBlockWidth: decreaseInfoBlockWidth,
            isNarrowest: isNarrowest,
            isWidest: isWidest
        };
        return service;

        function getInfoBlockWidth(){
            return infoBlockWidth;
        }

        function increaseInfoBlockWidth(){
            if(infoBlockWidth < INFO_BLOCK_MAX_WIDTH) infoBlockWidth ++;
        }

        function decreaseInfoBlockWidth(){
            if(infoBlockWidth > INFO_BLOCK_MIN_WIDTH) infoBlockWidth --;
        }

        function isNarrowest(){
            return infoBlockWidth == INFO_BLOCK_MIN_WIDTH;
        }

        function isWidest(){
            return infoBlockWidth == INFO_BLOCK_MAX_WIDTH;
        }
    }
})();

