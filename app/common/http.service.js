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

        function getResource(resource) {
            return $http.get(getResourceUrl(resource)).
            then(
                function (response) { return response.data; },
                function (response) { return $q.reject(new Error(response.status + ' ' + response.data.error)); }
            ).
            catch(function (e) { return $q.reject(e.message) });
        }

        function postResource(resource, data){
            return $http.post(getResourceUrl(resource, 'post'), data);
        }
    }
})();
