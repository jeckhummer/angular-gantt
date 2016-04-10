(function () {
    angular.module('common').provider('HttpService', HttpServiceProvider);

    function HttpServiceProvider(){
        var provider = this;
        var urlMapping = function (resource, mode) {
            var _mode = mode || 'get';
            var url = '/' + _mode + '_' + resource;
            return url;
        };

        provider.$get = HttpService;
        provider.setUrlMapping = setUrlMapping;

        function setUrlMapping(mapping){
            urlMapping = mapping;
        }

        function HttpService($q, $http) {
            var service = {
                getResourceUrl: getResourceUrl,
                getResource: getResource,
                postResource: postResource
            };
            return service;

            function getResourceUrl(resource, mode) {
                return urlMapping(resource, mode);
            }

            function handleHTTPPromise(promise) {
                return promise.then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return $q.reject(new Error(response.status + ' ' + response.data.error));
                    }
                ).catch(function (e) {
                    return $q.reject(e.message)
                });
            }

            function getResource(resource) {
                return handleHTTPPromise($http.get(getResourceUrl(resource)))
            }

            function postResource(resource, data) {
                return handleHTTPPromise($http.post(getResourceUrl(resource, 'post'), data));
            }
        }
    }
})();
