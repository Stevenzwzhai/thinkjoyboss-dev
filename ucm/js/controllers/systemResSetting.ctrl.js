App.controller("SystemResSettingCtrl",function($rootScope,Promise, systemResService){
    var token = window.sessionStorage.getItem("token");

    //加载系统列表
    systemResService.getServerList().then(function(res){
        $scope.systems = res;
    },function(err){
        $rootScope.alertError("系统列表,加载失败")
        console.log(err);
    });
});
