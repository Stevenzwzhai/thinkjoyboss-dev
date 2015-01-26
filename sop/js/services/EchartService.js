App.service('Map', function($http, $q) {
    var service = {
        getEchartData : function() {
            var deferred = $q.defer();

            $http.get('/home/provinceRole')
                .success(function(result) {
                deferred.resolve(result);
            });

            return deferred.promise;
        }
    }
    return service;
});