App.controller("MyBridgeCtrl",function($rootScope,$scope,Util){
    $rootScope.currentSys = "mBridge";
//    console.log("mybridge ctrl...");

    //从local中去判断
    var newRight = Util.getSgObj("bridgeRight");

    if(!newRight){

        //权限来控制显隐
        var  rightList = $rootScope.user.roleList.filter(function(role){
            if(role.sysCode == "mBridge") return true;
        });

        //拿到url集合
        newRight = rightList[0].resourceList.map(function(right){
            return right.resourceValue;
        });

    }

    $scope.bridgeRight = newRight;
//    console.log($scope.bridgeRight.indexOf('/deleteProtocol'));


});