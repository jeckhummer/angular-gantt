'use strict';

(function () {
    angular.module('app').config(URLLocalePrefixConfig);

    function URLLocalePrefixConfig(URLLocaleServiceProvider){
        //var prefix = 'jsWidgets/angular-gantt/app/';
        var prefix = '';

        URLLocaleServiceProvider.setPrefix(prefix);
    }
}());