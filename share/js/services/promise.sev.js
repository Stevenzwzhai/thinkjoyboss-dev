/**
 * 权限管理模块
 *
 */
App.factory("Promise",function($rootScope,$location,Util){

    var  Promise = {
        init : function(currentSys,localSysName,sysCode){

            //重新登录
            if(!$rootScope.user){
                $location.path("/auth/login");
                return;
            }
            $rootScope.currentSys = currentSys;
            //从local中去判断
            var newRight = $rootScope.user.resource[sysCode];
            return newRight;
        }

    }

    return  Promise

});