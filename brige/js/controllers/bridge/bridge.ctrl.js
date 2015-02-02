App

    .controller("BridgeCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,Util,BridgeShare) {

            console.log("bridge.....");

        $scope.posts =[];

        $scope.note = "";

        //服务列表
        $scope.serves = [];

        //url列表
        $scope.urls = [];

        //加载服务器列表
        BridgeService.getServerList().then(function(res){
            $scope.serves = res;
            BridgeShare.init($scope);
        },function(err){
            $rootScope.alertError("服务器列表,加载失败")
            console.log(err);
        });



        //控制切换
        $scope.currentPotoy = 1;

        //server 测试
        $scope.isServerSubmit = false;



        //协议
        $scope. isReqPoto =  true;
        $scope. isRepPoto =  true;

        //服务test
        $scope. isReqTest = true;
        $scope. isRepTest = true;



        //serv test
        $scope.sevFm ={
            ip  : "172.16.130.172",
            port : "8080"
        }


        //url
        $scope.urlList = SERVER.url.mBrige + "/url/list";
        $scope.params = {
            url : "",
            sysCode : ""
        }


        //监听完成
        $scope.$watch("params.url",function(newV){
            if(newV ==  ""){
                $scope.refresh = true;
            }
        });

        $scope.$watch("params.sysCode",function(newV){
                $scope.refresh = true;
        });

        //保存请求协议
        $scope.saveReqPoto = function(){

            var newReq = JSON.stringify( JSON.parse($scope.note.urlRequest));
            BridgeService.updateBridgeReq($scope.note.urlId,newReq).then(function(res){
                if(res.result){
                    $rootScope.alertSuccess(res.resultDesc);
                    $scope.refresh = true;
                }
                else{
                    $rootScope.alertError(res.resultDesc);
                }
            });
            $scope.isReqPoto = true;
        }


        //保存响应协议
        $scope.saveResPoto = function(){
            var newRes = JSON.stringify( JSON.parse($scope.note.urlResponse));
            BridgeService.updateBridgeRep($scope.note.urlId,newRes).then(function(res){
                if(res.result){
                    $rootScope.alertSuccess(res.resultDesc);
                    $scope.refresh = true;
                }
                else{
                    $rootScope.alertError(res.resultDesc);
                }
            });
            $scope.isRepPoto = true;
        }


        //保存服务器请求数据
        $scope.saveResTest = function(type){
            var newReq;

            if(type =='POST'){
                newReq = JSON.stringify( JSON.parse($scope.note.urlTestRequest.urlRequest));
            }
            else{

                //数据序列
                var  obj = {};
                var p =  $scope.note.paramMap;
                for(var i=0; i< p.length; i++){
                    var param =  p[i];
                    obj[param.paramKey]  =  param.paramType;
                }

                newReq = JSON.stringify(obj);
            }

            BridgeService.updateBridgeTestReq($scope.note.urlId,newReq).then(function(res){
                if(res.result){
                    $rootScope.alertSuccess(res.resultDesc);
                    $scope.refresh = true;
                }
                else{
                    $rootScope.alertError(res.resultDesc);
                }
            });
            $scope.isReqTest = true;


        }


        //服务端测试
        $scope.serverTest = function(){

            $scope.isServerSubmit = true;
            BridgeService.startServerTest($scope.note.urlId,$scope.sevFm.ip,$scope.sevFm.port).then(function(res){
                var newRep = JSON.stringify( JSON.parse(res.responseBody));
                $scope.note.serverTestResult.testResult =  res.testResult;
                $scope.note.serverTestResult.responseBody = newRep;
                $scope.note.serverTestResult.errorDesc = res.errorDesc;


                $scope.isServerSubmit = false;

            },function(){
                $scope.isServerSubmit = false;
            });

        }

        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }


        //查询
        $scope.enter = function(ev){
            if (ev.keyCode !== 13) return;
            $scope.refresh = true;
        }


        $scope.$on("BgChildRefresh",function(){
            $scope.refresh = true;
        });


        //创建协议
        $scope.create = function(){
           $rootScope.alertModal("brige/tpl/add-bridge.html","AddBridgeCtrl");

        }

        //删除协议
        $scope.delete = function(note){

            var conf =  window.confirm("确定要删除协议 "+note.exeUrl.url+" ?");
            if(conf){
                BridgeService.removeBridge(note.urlId).then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.refresh = true;
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                });
            }

        }

        //选择协议
        $scope.select = function(note){
            $scope.note = note;
            $scope. isReqPoto =  true;
            $scope.isRepPoto = true;

            $scope.posts.forEach(function(obj,index){

                if(obj.urlId == note.urlId){
                    note.active = true;
                }
                else{
                    obj.active  = false;
                }

            });

        }





    })

    .service("BridgeShare",function(){
          var  sv  = [];
          var  scope = {};

        return  {
            init : function($scope){
                scope = $scope
                sv = $scope.serves;
            },
            getServers : function($scope){
                return sv;
            },
            getScope : function(){
                return scope;
            }
        }
    })
    //add bridge
    .controller("AddBridgeCtrl", function ($rootScope, $modalInstance,$modal,$scope, $state, $window, $log, $q, $timeout, BridgeService,Util,BridgeShare) {
            console.log("add bridge");
        $scope.fm = {
            sysCode : "",
            url : "",
            requestType : "",
            urlDesc : "",
            owner : ""
        }



        //服务列表
        $scope.serves = BridgeShare.getServers();

        $scope.otherScope = BridgeShare.getScope();




        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


        //添加sub
        $scope.addSub = function(){
            console.log($scope.fm);
            BridgeService.addBridge($scope.fm.url,$scope.fm.sysCode,$scope.fm.requestType,$scope.fm.urlDesc,$scope.fm.owner)
                .then(function(res){
                    if(res.result){
                        $rootScope.alertSuccess(res.resultDesc);
                        $scope.otherScope.refresh = true;
                        $modalInstance.dismiss('cancel');

                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                },function(err){
                });
        }




    });