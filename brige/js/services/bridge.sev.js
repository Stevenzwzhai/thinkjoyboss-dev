App

    .factory("BridgeService", function ($http, $q, SERVER) {

        return {

            //发送邮件
            getServerList: function () {
                var defer = $q.defer();

                $http.get(SERVER.url.mBrige + "/systems",{})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            updateFiled : function (so) {
                var cp  = angular.copy(so);
                delete  cp.edit;
                delete  cp.isReadOnly;

                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/field/template/update",cp,{"headers" : {"is-json-data" : "true"} })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            addFiled : function (so) {
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/field/template/add",{
                    sysCode : so.system.systemCode,
                    fieldName : so.fieldName,
                    fieldValue  : so.fieldValue
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            removeFiled : function(id){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/field/template/delete",{
                    templateId : id
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;

            },

            getUrlList: function (url,sysCode,pageIndex,pageSize) {
                var defer = $q.defer();
                $http.get(SERVER.url.mBrige + "/url/list",{
                    params : {
                        url : url,
                        sysCode : sysCode,
                        pageIndex : pageIndex,
                        pageSize  : pageSize
                    }
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },


            addBridge : function(url,sysCode,requestType,urlDesc,owner){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/addProtocol",{
                        sysCode : sysCode,
                        url : url,
                        requestType : requestType,
                        urlDesc  : urlDesc,
                        owner : owner
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

           removeBridge : function(urlId){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/deleteProtocol",{
                    urlId : urlId
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },
            updateBridgeReq: function(urlId,urlRequest){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/update/protocol/request",{
                    urlId : urlId,
                    urlRequest : urlRequest
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;

            },

            updateBridgeRep: function(urlId,urlResponse){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/update/protocol/response",{
                    urlId : urlId,
                    urlResponse : urlResponse
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;

            },


            //测试服务端请求
            updateBridgeTestReq : function(urlId,urlRequest){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/update/client/request",{
                    urlId : urlId,
                    urlRequest : urlRequest
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;

            },


            startServerTest : function(urlId,ip,port,token){
            var defer = $q.defer();
                $http.get(SERVER.url.mBrige + "/exeServer",{
                    "params" :{
                        urlId : urlId,
                        ip : ip,
                        port : port,
                        token : token
                    }
                })
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(err) {
                    defer.reject(err);
                });
            return  defer.promise;
        },

            startClientTest : function(sysCode,port){
                var defer = $q.defer();
                $http.post(SERVER.url.mBrige + "/startServer",{
                        sysCode : sysCode,
                        port : port
                })
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