App.factory("systemResService", function ($http, $resource,$q, SERVER) {
        return {
            //获取
            getSystemList: function () {
                var defer = $q.defer();

                var token = window.sessionStorage.getItem("token");

                //获取系统列表
                $http.get(SERVER.url.ucm + "/systems" + "?token=" + token,{})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            addResource : function(resource){
                var defer = $q.defer();
                $http.post(SERVER.url.ucm + "/resource/add",resource
                ,{headers:{"is-json-data":1}})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            removeResource : function(resource){
                var defer = $q.defer();
                $http.post(SERVER.url.ucm + "/resource/remove",resource
                ,{headers:{"is-json-data":1}})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });

                return  defer.promise;
            },

            updateResource : function(resource){
                var defer = $q.defer();
                $http.post(SERVER.url.ucm + "/resource/update",resource
                ,{headers:{"is-json-data":1}})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            }


        }
    });