App.service('Map', function($http, $q, SERVER) {
    var service = {
        getEchartData : function() {
            var deferred = $q.defer();

            $http.get(SERVER.url.sop + '/home/provinceRole')
                .success(function(result) {
                deferred.resolve(result);
            });

            return deferred.promise;
        }
    }
    return service;
});