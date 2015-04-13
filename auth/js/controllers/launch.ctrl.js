'use strict';

/* Controllers */
App.controller('LaunchCtrl', function($scope,$rootScope) {

    //系统列表
    var checkroles = function(){

        var  resourceObj = $rootScope.user.resource;
        var  sys = [];

        for(var res  in  resourceObj){

            var obj = {};
            switch (res){
                case "boss":
                    obj.sysDesc = "BOSS";
                    obj.homeUrl = "#app/boss/home";
                    obj.icon = "imgs/logo/boss-logo.jpg";
                    break;
                case "mBridge":
                    obj.sysDesc = "鹊桥";
                    obj.homeUrl = "#app/mbridge/bridge";
                    obj.icon = "imgs/logo/mbridge-logo.jpg";
                    break;
                case   "ucm":
                    obj.sysDesc = "统一认证授权中心";
                    obj.homeUrl = "#app/ucm/setting";
                    obj.icon = "imgs/logo/default.jpg";
                    break;
                case "sop":
                    obj.sysDesc = "观星台";
                    obj.homeUrl = "#app/sop/userMap";
                    obj.icon = "imgs/logo/sop-logo.jpg";
                    break;
                case "notify":
                    obj.sysDesc = "烽火台";
                    obj.homeUrl = "#app/notify/sms";
                    obj.icon = "imgs/logo/notify-logo.jpg";
                    break;
            }

                sys.push(obj);
        }

        return sys;
    }

    //lanuch 系统拆分
    $rootScope.sysList = checkroles();
});