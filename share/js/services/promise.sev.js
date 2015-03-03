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
            var newRight = Util.getSgObj(localSysName);
            if(!newRight){
                //权限来控制显隐
                var  rightList = $rootScope.user.roleList.filter(function(role){
                    if(role.sysCode == sysCode) return true;
                });

                console.log("new..");

                //拿到url集合
                newRight = rightList[0].resourceList.map(function(right){
                    return right.resourceValue;
                });

                Util.setSgObj(localSysName,newRight);
            }

            return newRight;
        }

    }

    return  Promise

});