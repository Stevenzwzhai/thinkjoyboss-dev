App

    .service("bridgeSettingShare",function(SERVER){

        return {

            init : function($scope){


                //服务端 报文 列表
                $scope.severMessageModelPost = [];
                $scope.severPotoModelPost = [];

                //刷新 服务端报文
                $scope.severMessageModelRefresh = false;
                $scope.severPotoModelRefresh = false;

                //服务端 报文 参数
                $scope.severMessageModelParams = {
                    sysCode: ""
                };


                $scope.severPotoModelParams = {
                    sysCode: ""
                };


                $scope.severMessageModelIsSubmit = false;

                $scope.severPotoModelIsSubmit = false;

                $scope.isAdd = false;

                //服务列表
                $scope.serves = [];

                $scope.fm = {
                    fieldName : "",
                    fieldValue : "",
                    system : {
                        systemCode  : "",
                        systemName  : ""
                    }

                }

            }
        }

    })

    .controller("BridgeSettingCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,bridgeSettingShare,Util,BridgeShare) {

            console.log("bridge setting.....");

    })

    .controller("BridgeSettingMessageCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,bridgeSettingShare,Util,BridgeShare) {

        console.log("bridge setting message.....");


        //服务端字段配置 url
        $scope.severMessageModelUrl = SERVER.url.mBrige + "/field/template";

        //初始化
        bridgeSettingShare.init($scope);



        //加载服务器列表
        BridgeService.getServerList().then(function(res){
            $scope.serves = res;
//            BridgeShare.init($scope);
        },function(err){
            $rootScope.alertError("服务器列表,加载失败")
            console.log(err);
        });

        //查询服务端报文
        $scope.$watch("severMessageModelParams.sysCode",function(newV){
            $scope.severMessageModelRefresh = true;
        });

        //添加
        $scope.addFilederverMessage = function(){


            if($scope.fm.filename == ""){
                $rootScope.alertError("请填写字段名称！");
                return;
            }
            else if( $scope.fm.system.systemCode == ""){

                $rootScope.alertError("请选择系统！");
                return;
            }
            else if( $scope.fm.system.fieldValue == ""){
                $rootScope.alertError("请填写字段内容！");
            }


            try {
                // JSON.parse($scope.fm.fieldValue);

                BridgeService.addFiled($scope.fm).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severMessageModelRefresh = true;
                        $scope.resetFm();
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });

            } catch(e) {
                var str = JSON.stringify(e.message);
                $rootScope.alertError(str);
                console.log(e);
            } finally{

            }


        }
        $scope.resetFm = function(){

            $scope.isAdd = false;

            $scope.fm = {
                fieldName : "",
                fieldValue : "",
                system : {
                    systemCode  : "",
                    systemName  : ""
                }
            }
        }
        $scope.deleteServerMessage = function(sco){
            var conf =  window.confirm("确定要删除字段 "+sco.fieldName+" ?");
            if(conf){
                BridgeService.removeFiled(sco.templateId).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severMessageModelRefresh = true;
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });
            }

        }
        //修改报文
        $scope.editServerMessage = function(sco){
            //选中
            if(!sco.edit){
                sco.edit  = true;
                sco.isReadOnly = false;

            }
            //取消选中
            else{

                BridgeService.updateFiled(sco).then(function(res){
                    $rootScope.alertSuccess(res.resultDesc);
                    sco.edit  =false;
                    sco.isReadOnly = true;

                }).then(function(){
                    sco.edit  =false;
                    sco.isReadOnly = true;
                });
            }


        }

    })



    .controller("BridgeSettingPotoCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,bridgeSettingShare,Util,BridgeShare) {
        //报文
        $scope.severMessageModelUrl = SERVER.url.mBrige + "/body/template";


        //初始化
        bridgeSettingShare.init($scope);

        //加载服务器列表
        BridgeService.getServerList().then(function(res){
            $scope.serves = res;
//            BridgeShare.init($scope);
        },function(err){
            $rootScope.alertError("服务器列表,加载失败")
            console.log(err);
        });

        //查询服务端报文
        $scope.$watch("severMessageModelParams.sysCode",function(newV){
            $scope.severMessageModelRefresh = true;
        });

        //添加
        $scope.addFilederverMessage = function(){

            if($scope.fm.bodyType == ""){
                $rootScope.alertError("请选择报文类型?");
                return;
            }
            else if( $scope.fm.system.systemCode == ""){

                $rootScope.alertError("请选择系统！");
                return;
            }
            else if( $scope.fm.bodyValue == ""){
                $rootScope.alertError("请填写报文内容！");
            }

            try {
                $scope.fm.bodyValue =  JSON.stringify(JSON.parse($scope.fm.bodyValue));
                BridgeService.addPoto($scope.fm).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severMessageModelRefresh = true;
                        $scope.resetFm();
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });

            } catch(e) {
                var str = JSON.stringify(e.message);
                $rootScope.alertError(str);
                console.log(e);
            } finally{

            }


        }
        $scope.resetFm = function(){

            $scope.isAdd = false;

            $scope.fm = {
                fieldName : "",
                fieldValue : "",
                system : {
                    systemCode  : "",
                    systemName  : ""
                }
            }
        }
        $scope.deleteServerMessage = function(sco){
            var conf =  window.confirm("确定要删除报文?");
            if(conf){
                BridgeService.removePoto(sco).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severMessageModelRefresh = true;
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });
            }

        }
        //修改报文
        $scope.editServerMessage = function(sco){
            //选中
            if(!sco.edit){
                sco.edit  = true;
                sco.isReadOnly = false;

            }
            //取消选中
            else{

                BridgeService.updateFiled(sco).then(function(res){
                    $rootScope.alertSuccess(res.resultDesc);
                    sco.edit  =false;
                    sco.isReadOnly = true;

                }).then(function(){
                    sco.edit  =false;
                    sco.isReadOnly = true;
                });
            }


        }



    });


















