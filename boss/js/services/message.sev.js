
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
               $http.post(SERVER.url.message + "/message/sendMessage", data
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