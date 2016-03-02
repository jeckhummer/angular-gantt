angular.module('common', []);

(function () {
    angular.module('common').factory('HttpService', HttpService);

    function HttpService($q, $http) {
        var baseUrl = '/';
        var service = {
            getResourceUrl: getResourceUrl,
            getResource: getResource,
            postResource: postResource
        };
        return service;

        function getResourceUrl(resource, mode) {
            var _mode = mode || 'get';
            var url = baseUrl + _mode + '_' + resource;
            return url;
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
})();
