/**
 * 权限管理模块
 *
 */
App.factory("Promise",function($rootScope,Util){

    var  Promise = {
        init : function(currentSys,localSysName,sysCode){
            $rootScope.currentSys = currentSys;
            //从local中去判断
            var newRight = Util.getSgObj(localSysName);
            if(!newRight){
                //权限来控制显隐
                var  rightList = $rootScope.user.roleList.filter(function(role){
                    if(role.sysCode == sysCode) return true;
                });

                //拿到url集合
                newRight = rightList[0].resourceList.map(function(right){
                    return right.resourceValue;
                });
            }
            return newRight;
        }

    }

    return  Promise

});