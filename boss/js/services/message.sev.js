
App

    .factory("MessageService", function ($http, $q, SERVER) {


       var Ajax = {


           //发送消息
           sendMessage: function (obj) {
               var defer = $q.defer();
               var data = {
                   "style": "",
                   "clientInfo": {},
                   "data" :obj
               };
               $http.post(SERVER.url.message + "/message/sendMessage?token=c1de48a7-9e9e-4b33-9b8f-a6a04ba6b3a0", data
               ,{headers : {"is-json-data":1}})
                   .success(function (result) {
                        defer.resolve(result);
                   })
                   .error(function (err) {
                           console.error("class getList error");
                            defer.reject(err);
                   });
               return  defer.promise;
           }

       }

        return Ajax;

    });