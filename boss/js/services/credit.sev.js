App

    .factory("CreditService",function($http,$q,$resource,SERVER){

        return {


            queryCreditByPhone : function(phone){
                var defer =  $q.defer();

                var data = {
                    "style": "",
                    "data": {
                        "phone": phone

                    },
                    "clientInfo": {}
                }


                $http.post(SERVER.url.credit+"/boss/queryCreditByPhone",data,{headers:{"is-json-data":1}})
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return  defer.promise;

            },
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

            addProduct : function(dt){
                var defer =  $q.defer();
                var data = {
                    "style": "",
                    "data": dt,
                    "clientInfo": {}
                }


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