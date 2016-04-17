'use strict';
(function () {
    angular.module('common').provider('URLLocaleService', URLLocaleServiceProvider);

    function URLLocaleServiceProvider(){
        var provider = this;
        var _range;
        var _prefix = "";

        provider.init = init;
        provider.$get = $get;

        function init(range, prefix){
            _range = range;
            _prefix = prefix;
        }

        function $get(){
            var service = new URLLocale(_range, _prefix)
            return service;
        }
    }

    function URLLocale(range, prefix) {
        var _URLDictionary = {};

        var service = {
            getURL: getURL,
            addURL: addURL,
            addURLRange: addURLRange
        };

        _init(range);
        return service;

        function _init(range){
            addURLRange(range);
        }

        function getURL(name){
            var suffix = _URLDictionary[name];
            if(!suffix){
                throw `"${name}" URL alias wasn't recognized`;
            }
            var URL = `${prefix}${suffix}`;

            return URL;
        }

        function addURL(name, url){
            if(name == undefined || name == "" || name == null){
                throw `Name shouldn't be null!`;
            }
            if(url == undefined || url == "" || url == null){
                throw `URL shouldn't be null!`;
            }

            _URLDictionary[name] = url;
        }

        function addURLRange(range){
            range.forEach(function (obj) {
                var name = obj.name;
                var url = obj.url;
                addURL(name, url);
            });
        }
    }
})();