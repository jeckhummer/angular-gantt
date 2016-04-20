(function () {
    angular.module('gantt').factory('GanttHttpService', GanttHttpService);

    function GanttHttpService($q, $http, GanttOptionsService) {
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
                    console.log('http received', data);
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
            console.log('http sent', data);
            data = Object.assign(_getConfigObj(), data);
            return handleHTTPPromise($http.post(_urlPrefix + url, data));
        }

        function _getConfigObj() {
            return {
                uid: GanttOptionsService.getUserID(),
                docid: GanttOptionsService.getDOCID(),
                logUid: GanttOptionsService.getLogUserID()
            };
        }
    }
})();
