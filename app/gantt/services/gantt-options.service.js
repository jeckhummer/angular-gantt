'use strict';
(function () {
    angular.module('gantt').factory('GanttOptionsService', GanttOptionsService);

    function GanttOptionsService() {
        var INFO_BLOCK_MIN_WIDTH = 25;
        var INFO_BLOCK_MAX_WIDTH = 50;
        var WIDTH_STEP = 1;

        var ZOOM_MAX = 100000;
        var ZOOM_MIN = 100;
        var ZOOM_STEP = 50;

        var infoBlockWidth = INFO_BLOCK_MIN_WIDTH;
        var zoom = ZOOM_MIN;

        var service = {
            getInfoBlockWidth: getInfoBlockWidth,
            increaseInfoBlockWidth: increaseInfoBlockWidth,
            decreaseInfoBlockWidth: decreaseInfoBlockWidth,
            isNarrowest: isNarrowest,
            isWidest: isWidest,
            getZoom: getZoom,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
            isMaxZoom: isMaxZoom,
            isMinZoom: isMinZoom
        };
        return service;

        function getInfoBlockWidth(){
            return infoBlockWidth;
        }

        function increaseInfoBlockWidth(){
            if(infoBlockWidth < INFO_BLOCK_MAX_WIDTH) infoBlockWidth += WIDTH_STEP;
        }

        function decreaseInfoBlockWidth(){
            if(infoBlockWidth > INFO_BLOCK_MIN_WIDTH) infoBlockWidth -= WIDTH_STEP;
        }

        function isNarrowest(){
            return infoBlockWidth == INFO_BLOCK_MIN_WIDTH;
        }

        function isWidest(){
            return infoBlockWidth == INFO_BLOCK_MAX_WIDTH;
        }

        function getZoom(){
            return zoom;
        }

        function zoomIn(){
            if(zoom < ZOOM_MAX) zoom += ZOOM_STEP;
        }

        function zoomOut(){
            if(zoom > ZOOM_MIN) zoom -= ZOOM_STEP;
        }

        function isMaxZoom(){
            return zoom == ZOOM_MAX;
        }

        function isMinZoom(){
            return zoom == ZOOM_MIN;
        }
    }
})();

