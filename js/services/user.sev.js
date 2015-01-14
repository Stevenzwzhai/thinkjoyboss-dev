App

    .factory("UserService",function($http,$q,SERVER){

        return {


            getUserInfo : function(phone){
                var defer =  $q.defer();
                $http.get(SERVER.url.uc+"/userBoss/getUserInfo",{
                    params : {
                        phone : phone,
                        token  : ""
                    }
                })
                 .success(function(result){

                        defer.resolve(result);

                    })
                    .error(function(err){
                        console.error("user error");
                        defer.reject(err);
                  });

                return  defer.promise;
            },
            deletePhone : function(phone){
                var defer =  $q.defer();

                $http.get(SERVER.url.message+"/message/deleteUserByPhone?token=&phone="+phone)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){

                        console.error("MessageService getList error");
                        defer.reject(err);

                    });

                return  defer.promise;
            }


        }


    });