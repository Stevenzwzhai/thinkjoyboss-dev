App

    .factory("BridgeService", function ($http, $q, SERVER) {

        return {

            //发送邮件
            getServerList: function () {
                var defer = $q.defer();

                var token = window.sessionStorage.getItem("token");

                $http.get(SERVER.url.mBridge + "/systems" + "?token=" + token,{})
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
                var token = window.sessionStorage.getItem("token");

                var defer = $q.defer();
                $http.post(SERVER.url.mBridge + "/field/template/update" + "?token=" + token,cp,{"headers" : {"is-json-data" : "true"} })
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/field/template/add" + "?token=" + token,{
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


            addPoto : function (so) {
                var defer = $q.defer();

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/body/template/add" + "?token=" + token,{
                    sysCode : so.system.systemCode,
                    bodyType : so.bodyType,
                    bodyValue  : so.bodyValue
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            removePoto : function (so) {
                var defer = $q.defer();

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/body/template/delete" + "?token=" + token,{
                    sysCode : so.system.systemCode,
                    bodyType : so.bodyType
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/field/template/delete" + "?token=" + token,{
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

                var token = window.sessionStorage.getItem("token");

                $http.get(SERVER.url.mBridge + "/url/list",{
                    params : {
                        url : url,
                        sysCode : sysCode,
                        pageIndex : pageIndex,
                        pageSize  : pageSize,
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


            addBridge : function(url,sysCode,requestType,urlDesc,owner,requestBodyType){
                var defer = $q.defer();

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/addProtocol" + "?token=" + token,{
                        sysCode : sysCode,
                        url : url,
                        requestType : requestType,
                        urlDesc  : urlDesc,
                        owner : owner,
                        requestBodyType : requestBodyType
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

               var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/deleteProtocol" + "?token=" + token,{
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

            removeSystem : function(systemCode,systemName,mockPort){
                var defer = $q.defer();
                var token = window.sessionStorage.getItem("token");
                $http.post(SERVER.url.mBridge + "/system/delete" + "?token=" + token,{
                    systemCode : systemCode,
                    systemName : systemName,
                    mockPort : mockPort
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;

            },

            updateSystem: function(systemCode,systemName,mockPort){
                var defer = $q.defer();
                var token = window.sessionStorage.getItem("token");
                $http.post(SERVER.url.mBridge + "/system/update" + "?token=" + token,{
                    systemCode : systemCode,
                    systemName : systemName,
                    mockPort : mockPort
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            },

            addSystem : function(systemCode,systemName,mockPort){

                var defer = $q.defer();
                var token = window.sessionStorage.getItem("token");
                $http.post(SERVER.url.mBridge + "/system/add" + "?token=" + token,{
                    systemCode : systemCode,
                    systemName : systemName,
                    mockPort : mockPort
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/update/protocol/request" + "?token=" + token,{
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/update/protocol/response" + "?token=" + token,{
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/update/client/request" + "?token=" + token,{
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


            startServerTest : function(urlId,ip,port,token,rootPath){
            var defer = $q.defer();

                $http.get(SERVER.url.mBridge + "/exeServer",{
                    "params" :{
                        urlId : urlId,
                        ip : ip,
                        port : port,
                        token : token,
                        rootPath : rootPath
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

                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.mBridge + "/startServer" + "?token=" + token,{
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