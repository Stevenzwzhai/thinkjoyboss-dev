App

    .factory("CreditService",function($http,$q,$resource,SERVER){

        return {
            toggleStatus : function(status,orderNum){
                var defer =  $q.defer();
                var data = {
                    "style": "",
                    "data": {
                        "status": status,
                        "orderNumber": orderNum
                    },
                    "clientInfo": {}
                }

                $http.post(SERVER.url.credit+"/boss/updateExchangeStatus",data,{headers:{"is-json-data":1}})
                 .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                  });
                return  defer.promise;
            },

            addProduct : function(data){
                var defer =  $q.defer();
                $http.post(SERVER.url.credit+"/boss/addProduction",data,
                    {headers:{"is-json-data":1}})
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return  defer.promise;
            }

        }


    });