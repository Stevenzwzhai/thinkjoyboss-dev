'use strict';

/* Controllers */
// signin controller
App.controller('SingInCtrl', function($window,$q,$scope,$rootScope,$state,Util,SignInSev) {


    $scope.userTypes = [
        {"typeName" : "ldap", typeDesc : "域账号"},
        {"typeName" : "uc", typeDesc : "知了"},
        {"typeName" : "extend", typeDesc : "其他"},
    ];



    //判断localstorage
    var tempUser = Util.getSgObj("user");
    var userName= "";
    if(tempUser){
        userName = tempUser.accountName;
    }



    $scope.user = {
        username : userName,
        password : "",
        account : $scope.userTypes[0]
    };




    $scope.authError = null;
    $scope.login = function(user) {
        $scope.authError = null;


//        $q.all({
//            login : SignInSev.login(user.username,user.password,user.account.typeName),
//            launch : SignInSev.launch
//        }).then(function(res){
//
//            console.log(res);
//        },function(err){
//            console.log("back");
//        });




        var  access_token;

        SignInSev.login(user.username,user.password,user.account.typeName)
            //login
            .then(function(res){
                    access_token  =res.access_token;
                    return SignInSev.launch(res, user);
            },function(err){
                console.log(err);
                return $q.reject(err.error_description);
            })

            //launch
            .then(function(res) {

                //存储本次accent_token
                Util.setLg("accent_token",access_token);
                $window.sessionStorage.token = access_token;

                //存储本地用户信息
                Util.setLgObj("user",res);

                //暴露到全局
                $rootScope.user = res;

                //清理缓存部分
                Util.remove("bossRight");
                Util.remove("sopRight");
                Util.remove("notifyRight");
                Util.remove("bridgeRight");

                $state.go("launch");

            },function(err) {
                $rootScope.alertError(err);
            });

    };
})
;