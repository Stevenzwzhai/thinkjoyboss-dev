'use strict';

/* Controllers */
// signin controller
App.controller('SingInCtrl', function($window,$scope,$rootScope,$state,Util,SignInSev) {


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



        SignInSev.login(user.username,user.password,user.account.typeName)
            .then(function(res){
                //登录成功
                if(res.result){
                    //设置 token
                    $window.sessionStorage.token = res.token;
                    //本地存储登录信息
                    Util.setSgObj("user",res.ucmUser);



                    //用户信息保存到cookie中
                    window.sessionStorage.setItem("user", JSON.stringify(res.ucmUser));
                    $rootScope.user = res.ucmUser;

                    //清理缓存部分
                    Util.remove("bossRight");
                    Util.remove("sopRight");
                    Util.remove("notifyRight");
                    Util.remove("bridgeRight");



                    $state.go("launch");
                }
                //登录失败
                else{
                  $rootScope.alertError("验证错误！");
                }

            },function(err){

            });

    };
})
;