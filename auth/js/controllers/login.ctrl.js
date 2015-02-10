'use strict';

/* Controllers */
// signin controller
App.controller('SingInCtrl', function($window,$scope,$rootScope,$state,Util,SignInSev) {
    $scope.user = {
        username : "",
        password : "",
        account : ""

    };

    $scope.userTypes = [
        {"typeName" : "ldap", typeDesc : "域账号"},
        {"typeName" : "uc", typeDesc : "知了"},
        {"typeName" : "extend", typeDesc : "其他"},
    ];


    $scope.authError = null;
    $scope.login = function(user) {
        $scope.authError = null;

        SignInSev.login(user.username,user.password,user.account)
            .then(function(res){
                //登录成功
                if(res.result){
                    //设置 token
                    $window.sessionStorage.token = res.token;
                    //本地存储登录信息
                    Util.setSgObj("user",res.ucmUser);
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