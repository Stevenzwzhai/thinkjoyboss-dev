//登录

App
    .factory("SignInSev", function ($http,$q,SERVER) {
        var SignIn = {
            login : function(username,password,account){
                var defer =  $q.defer();
                $http.post(SERVER.url.ucm+"/login",{
                        username : username,
                        password  : password,
                        accountType : account

                })
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        console.error("login error");
                        defer.reject(err);
                    });

                return  defer.promise;
            }
        };
        return SignIn;
    });