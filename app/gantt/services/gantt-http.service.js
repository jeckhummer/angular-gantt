(function () {
    angular.module('gantt').factory('GanttHttpService', GanttHttpService);

    function GanttHttpService($q, $http) {
        var _urlPrefix = "GanttApi.asmx/";

        var service = {
            sendRequest: sendRequest
        };
        return service;

        function handleHTTPPromise(promise) {
            return promise.then(
                function (response) {
                    var str = response.data.d;
                    var data = JSON.parse(str);
                    console.log('http ', data);
                    return data;
                },
                function (response) {
                    return $q.reject(new Error(response.status + ' ' + response.data.error));
                }
            ).catch(function (e) {
                return $q.reject(e.message)
            });
        }

        function sendRequest(url, data) {
            data = Object.assign(_getConfigObj(), data);
            return handleHTTPPromise($http.post(_urlPrefix + url, data));
        }

        function _getConfigObj() {
            return {
                uid: 1,
                docid: 6,
                logUid: 8
            };
        }
    }
})();
