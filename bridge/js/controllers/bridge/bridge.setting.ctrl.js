App

    .service("bridgeSettingShare",function(SERVER){

        return {

            init : function($scope){

                //服务端 报文 列表
                $scope.severMessageModelPost = [];
                $scope.severPotoModelPost = [];
                $scope.severSystemModelPost = [];



                //刷新 服务端报文
                $scope.severMessageModelRefresh = false;
                $scope.severPotoModelRefresh = false;
                $scope.severSystemModelRefresh = false;

                //服务端 报文 参数
                $scope.severMessageModelParams = {
                    sysCode: ""
                };


                $scope.severPotoModelParams = {
                    sysCode: ""
                };


                $scope.severSystemModelParams = {

                };


                $scope.severMessageModelIsSubmit = false;

                $scope.severPotoModelIsSubmit = false;

                $scope.severSystemModelIsSubmit = false;


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
        var token = window.sessionStorage.getItem("token");

        //服务端字段配置 url
        $scope.severMessageModelUrl = SERVER.url.mBridge + "/field/template" + "?token=" + token;

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
        var token = window.sessionStorage.getItem("token");
        //报文
        $scope.severMessageModelUrl = SERVER.url.mBridge + "/body/template" + "?token=" + token;


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


                //验证json





                BridgeService.addPoto(sco).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess("更新成功");
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                    sco.edit  =false;
                    sco.isReadOnly = true;

                }).then(function(){
                    sco.edit  =false;
                    sco.isReadOnly = true;
                });
            }

        }

    })


    .controller("BridgeSettingSystemCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,bridgeSettingShare,Util,BridgeShare) {

        var token = window.sessionStorage.getItem("token");
        //系统配置
        $scope.severSystemModelUrl = SERVER.url.mBridge + "/systems/page" + "?token=" + token;

        //初始化
        bridgeSettingShare.init($scope);



        $scope.fm = {
        }

        //查询服务端报文
        $scope.$watch("severSystemModelParams.sysCode",function(newV){
            $scope.severSystemModelRefresh = true;
        });


        //添加
        $scope.addFilederverMessage = function(){

            if($scope.fm.systemName == ""){
                $rootScope.alertError("请指定系统名称!");
                return;
            }
            else if( $scope.fm.systemCode == ""){

                $rootScope.alertError("请指定系统编码!");
                return;
            }
            else if( $scope.fm.mockPort == ""){
                $rootScope.alertError("请指定测试端口!");
            }

            try {
                BridgeService.addSystem($scope.fm.systemCode,$scope.fm.systemName,$scope.fm.mockPort).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severSystemModelRefresh = true;
                        $scope.resetFm();
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });

            } catch(e) {
                console.log(e);
            } finally{

            }


        }
        $scope.resetFm = function(){
            $scope.isAdd = false;
            $scope.fm = {
                systemCode : "",
                systemName : "",
                mockPort  : ""
            }
        }

        //删除系统
        $scope.deleteServerMessage = function(sco){
            var conf =  window.confirm("确定要删除系统?");
            if(conf){
                BridgeService.removeSystem(sco.systemCode,sco.systemName,sco.mockPort).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.severSystemModelRefresh = true;
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });
            }

        }
        //修改系统
        $scope.editSysMessage = function(sco){

//            sco.edit  = !sco.edit;

            //选中
            if(!sco.edit){
                sco.edit  = true;
                sco.isReadOnly = false;

            }
            //取消选中
            else{

                BridgeService.updateSystem(sco.systemCode,sco.systemName,sco.mockPort).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess("更新成功");
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                    sco.edit  =false;
                    sco.isReadOnly = true;

                }).then(function(){
                    sco.edit  =false;
                    sco.isReadOnly = true;
                });

                sco.edit  =false;
            }

        }

    });


















