'use strict';

/* Controllers */
// signin controller
App.controller('SingInCtrl', function($scope,$state,SignInSev) {
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

                console.log(res);
            },function(err){

            });

    };
})
;