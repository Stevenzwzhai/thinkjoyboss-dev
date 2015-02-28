'use strict';

/* Controllers */
App.controller('LaunchCtrl', function($scope,$rootScope) {

    //系统列表
    var checkroles = function(){
        var  baseSysArray = $rootScope.user.roleList;
        var newBassArray = [];
        for(var i=0; i<baseSysArray.length;i++){
            var obj = baseSysArray[i];

            //添加私有字段
            switch (obj.sysCode){
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
                    obj.sysDesc = "UCM";
                    obj.homeUrl = "#app/ucm/setting";
                    obj.icon = "imgs/logo/default.jpg";
                    break;

                case "sop":

                    obj.sysDesc = "观星台";
                    obj.homeUrl = "#app/sop/userMap";
                    obj.icon = "imgs/logo/sop-logo.jpg";
                    break;

                case "notify":

                    obj.sysDesc = "消息中心";
                    obj.homeUrl = "#app/notify/sms";
                    obj.icon = "imgs/logo/notify-logo.jpg";
                    break;

            }

            //去重
            var tempFlag = true;
            for(var j = 0; j < newBassArray.length; j++) {
                if(obj.sysCode == newBassArray[j].sysCode) {
                    tempFlag = false;
                    break;
                }
            }
            if(tempFlag) {
                newBassArray.push(obj);
            }
        }
        return newBassArray;
    }



    //映射
    var roleList = checkroles();

    //lanuch 系统拆分
    $rootScope.roleList = checkroles();
});