App

    .factory("UserService",function($http,$q,$resource,SERVER){

        return {


            getUserInfo : function(phone){
                var defer =  $q.defer();
                var token = window.sessionStorage.getItem("token");

                $http.post(SERVER.url.uc+"/userBoss/getUserInfo?token=" + token,{
                       data : {
                           "phone" : phone
                       }

                },{headers:{"is-json-data":1}})
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
                var token = window.sessionStorage.getItem("token");

                $http.get(SERVER.url.message+"/message/deleteUserByPhone?token=" + token + "&phone="+phone)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){

                        console.error("MessageService getList error");
                        defer.reject(err);

                    });

                return  defer.promise;
            },

            deleteChild : function(childId){
                var defer =  $q.defer();
                $http.post(SERVER.url.uc+"/childBoss/deleteChild",{
                    childId : childId
                })
                    .success(function(res){
                        defer.resolve(res);
                    })
                    .error(function(err){
                        defer.reject(err);

                    });

                return  defer.promise;


            }


        }


    });