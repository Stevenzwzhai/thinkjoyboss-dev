App

    .controller("BridgeCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,Util,BridgeShare) {

            console.log("bridge.....");

        $scope.posts =[];

        $scope.note = "";

        $scope.jsonError = "dd";

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
        $scope.isClientSubmit = false;


        //协议
        $scope. isReqPoto =  true;
        $scope. isRepPoto =  true;

        //服务test
        $scope. isReqTest = true;
        $scope. isRepTest = true;

        $scope.isReqTestSuper = true;


        //serv test
        $scope.sevFm ={
            ip  : "",
            port : "",
            token  : "",
            rootPath : ""
        }

        //client test
        $scope.clientFm = {
            port : ""
        }



        //url
        $scope.urlList = SERVER.url.mBridge + "/url/list";
        var token = window.sessionStorage.getItem("token");
        $scope.params = {
            url : "",
            sysCode : "",
            resultType : "all",
            token : token
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


        var  getLine = function(message){
                var first = message.indexOf("line");
                var second = message.indexOf(":");
                var str = message.substring(first+4,second);
                console.log(str);


        }


        //保存请求协议
        $scope.saveReqPoto = function(){

            var newReq;

            try {
                var  result = jsonlint.parse($scope.note.urlRequest);
                newReq = JSON.stringify(result, null, "  ");
                $scope.note.urlRequest = newReq;

            } catch(e) {
                $rootScope.alertError("json格式错误!");

                console.log(e);

                $scope.note.exReq  = true;
                $scope.note.errReq = e.message;


            } finally{
                if(newReq){
                    BridgeService.updateBridgeReq($scope.note.urlId,newReq).then(function(res){
                        if(res.result){
                            $rootScope.alertSuccess(res.resultDesc);
                            $scope.refresh = true;
                        }
                        else{
                            $rootScope.alertError(res.resultDesc);
                        }
                        $scope.error = "";
                    });
                    $scope.isReqPoto = true;
                    $scope.note.exReq  = "";
                    $scope.note.errReq = "";
                }

            }

        }


        //保存响应协议
        $scope.saveResPoto = function(){

            var newRes;
            try {
                var  result = jsonlint.parse($scope.note.urlResponse);
                newRes = JSON.stringify(result, null, "  ");
                $scope.note.urlResponse = newRes;
            } catch(e) {
                $rootScope.alertError("json格式错误!");

                $scope.note.exRep  = true;
                $scope.note.errRep = e.message;

            } finally{
                if(newRes) {
                    BridgeService.updateBridgeRep($scope.note.urlId,newRes).then(function(res){
                        if(res.result){
                            $rootScope.alertSuccess(res.resultDesc);
                            $scope.refresh = true;
                        }
                        else{
                            $rootScope.alertError(res.resultDesc);
                        }

                        $scope.error = "";
                    });
                    $scope.isRepPoto = true;

                    $scope.note.exRep  = "";
                    $scope.note.errRep = "";
                }
            }


        }


        //保存服务器请求数据
        $scope.saveResTest = function(type){

            var newReq;

            if(type =='POST'){
                var newReq;

                try {
                    var  result = jsonlint.parse($scope.note.urlTestRequest.urlRequest);
                    newReq = JSON.stringify(result, null, "  ");
                    $scope.note.urlTestRequest.urlRequest = newReq;

                } catch(e) {
                    $rootScope.alertError("json格式错误!");

                    $scope.note.exTestReq  = true;
                    $scope.note.errTestReq = e.message;

                } finally{

                   if(newReq){
                       saveTest(newReq);

                       $scope.note.exTestReq  = "";
                       $scope.note.errTestReq = "";
                   }
                }
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
                saveTest(newReq);
            }

        }


        var saveTest  =function(newReq){

            BridgeService.updateBridgeTestReq($scope.note.urlId,newReq).then(function(res){
                if(res.result){
                    $rootScope.alertSuccess(res.resultDesc);
                    $scope.refresh = true;
                }
                else{
                    $rootScope.alertError(res.resultDesc);
                }

                $scope.error = "";
            });

        }


        var getSelectNote =  function(note){

            for(var i=0;i<$scope.posts.length;i++){
                  var pi = $scope.posts[i];
                   if(pi.urlId == note.urlId ){
                        return  $scope.posts[i];
                   }
            }

            return  "";
        }


        $scope.filterType = function(type){
            $scope.params.resultType = type;
            $scope.refresh = true;
        }


        //服务端测试
        $scope.serverTest = function(){


            $scope.isServerSubmit = true;
            BridgeService.startServerTest($scope.note.urlId,$scope.sevFm.ip,$scope.sevFm.port,$scope.sevFm.token,$scope.sevFm.rootPath).then(function(res){

                var newRep = JSON.stringify( JSON.parse(res.responseBody));
                res.responseBody =  newRep;
                $scope.note.serverTestResult = res;


                //替换左侧菜单
                var thisNote = getSelectNote($scope.note);
                thisNote.serverTestResult = res;


                $scope.isServerSubmit = false;

            },function(){
                $scope.isServerSubmit = false;
            });

        }
        //客户端测试
        $scope.clientTest = function(){


            if($scope.clientFm.port < 9000 ||  $scope.clientFm.port  > 65535){
                $rootScope.alertError("指定端口在 9000 - 65535");
                return;
            }

            $scope.isClientSubmit = true;
            BridgeService.startClientTest($scope.note.system.systemCode,$scope.clientFm.port).then(function(res){

                if(res.result){
                    $rootScope.alertSuccess(res.resultDesc);
                    $scope.refresh = true;
                }
                else{
                    $rootScope.alertError(res.resultDesc);
                }


                $scope.isClientSubmit = false;

            },function(){
                $scope.isClientSubmit = false;
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
           $rootScope.alertModal("bridge/tpl/add-bridge.html","AddBridgeCtrl");

        }

        //删除协议
        $scope.delete = function(note){

            var conf =  window.confirm("确定要删除协议 "+note.exeUrl+" ?");
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

            $scope.error  =  "";



            //格式化测试结果json
            $scope.note.serverTestResult.responseBody = formatJson( $scope.note.serverTestResult.responseBody);

            $scope.posts.forEach(function(obj,index){

                if(obj.urlId == note.urlId){
                    note.active = true;
                }
                else{
                    obj.active  = false;
                }

            });
        }

        function formatJson (str){

            var newReq;
            try {
                var  result = jsonlint.parse(str);
                newReq = JSON.stringify(result, null, "  ");
                return  newReq

            } catch(e) {
                $rootScope.alertError("json格式错误!");
                console.log(e);
                $scope.note.exReq  = true;
                $scope.note.errReq = e.message;
                return "";

            } finally{

            }



        }



        //进入测试服务端
        $scope.showSeverTest = function(){

            $scope.currentPotoy=2

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