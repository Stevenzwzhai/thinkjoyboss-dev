//登录

App
    .factory("SignInSev", function ($http,$q,SERVER) {
        var SignIn = {
            login : function(username,password,account){
                var defer =  $q.defer();
                $http.post(SERVER.url.ucm+"/oauth/token",{
                    client_id : "thinkjoy",
                    client_secret : "thinkjoy",
                    grant_type : "password",
                    username : username,
                    password  : password,
                    app : account
                })
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){

                        defer.reject(err);
                    });

                return  defer.promise;
            },
            launch : function(res, user){
                var defer =  $q.defer();
                $http.get(SERVER.url.ucm+"/launch",{
                    params: {
                        username : user.username,
                        sysCode : user.account.typeName,
                        token : res.access_token
                    }

                })
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        console.error("login error, err info is:" + err);
                        defer.reject(err);
                    });

                return  defer.promise;
            }
        };
        return SignIn;
    });