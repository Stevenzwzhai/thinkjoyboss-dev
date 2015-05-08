App.controller("SystemResSettingCtrl",function($rootScope, $scope, Promise, SERVER,systemResService){
    var token = window.sessionStorage.getItem("token");

    //加载系统列表
    systemResService.getSystemList().then(function(res){
        $scope.systems = res;
    },function(err){
        $rootScope.alertError("系统列表,加载失败")
        console.log(err);
    });



    $scope.systemResourceUrl = SERVER.url.ucm + "/resources";

    //学校列表
    $scope.systemResourcePosts = [];

    //刷新列表
    $scope.systemResourceRefresh = false;

    //参数
    $scope.systemResourceParams = {
        sysId: 0
    };

    $scope.systemResourceSubmit = false;

    //监听完成
    $scope.$watch("systemResourceParams.sysId",function(val){
        if(val){
            $scope.systemResourceRefresh = true;
        }
    });


    $scope.fm ={
        resourceName : "",
        resourceValue : "",
        sysCode : ""
    }

    $scope.resetFm = function(){
        $scope.fm.resourceName = "";
        $scope.fm.resourceValue = "";
        $scope.fm.sysId = "";
        $scope.isAdd = false;

    }



    $scope.add = function(){

        if($scope.fm.resourceName == ""){
            $rootScope.alertError("请填写资源名称!");
            return;
        }
        else if( $scope.fm.resourceValue == ""){

            $rootScope.alertError("请填写资源内容！");
            return;
        }
        else if( $scope.fm.sysId == ""){
            $rootScope.alertError("请选择系统");
        }

        systemResService.addResource($scope.fm).then(function(res){
            if(res.operStatus){
                $rootScope.alertSuccess(res.operDesc);
                $scope.systemResourceRefresh = true;
            }
            else{
                $rootScope.alertError(res.operDesc);
            }
        });

    }


    $scope.edit = function(sco){
        //选中
        if(!sco.edit){
            sco.edit  = true;

        }
        //取消选中
        else{
            systemResService.updateResource(sco).then(function(res){
                if(res.operStatus){
                    $rootScope.alertSuccess(res.operDesc);
                    $scope.systemResourceRefresh = true;
                }
                else{
                    $rootScope.alertError(res.operDesc);
                }
                sco.edit  =false;

            }).then(function(){
                sco.edit  =false;
            });
        }



    }

    $scope.delete = function(resource){
        var ques=window.confirm("确定要删除  "+resource.resourceName+"  吗？");
        if(ques){
            //数据修改
            systemResService.removeResource(resource).then(function(res){
                if(res.operStatus){
                    $rootScope.alertSuccess(res.operDesc);
                    $scope.systemResourceRefresh = true;
                }
                else{
                    $rootScope.alertError(res.operDesc);
                }

            }).then(function(){
            });
        }


    }

    //查询
    $scope.search = function () {
        $scope.refresh = true;
    }




});
