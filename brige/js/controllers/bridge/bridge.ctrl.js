App

    .controller("BridgeCtrl", function ($rootScope,$modal,$scope, $state, $window, $log, $q, $timeout, SERVER,BridgeService,Util,BridgeShare) {

            console.log("bridge.....");

        $scope.posts =[



        ];



        //服务列表
        $scope.serves = [];

        //url列表
        $scope.urls = [];

        //加载服务器列表
        BridgeService.getServerList().then(function(res){
            $scope.serves = res;
            BridgeShare.initServers($scope.serves);
        },function(err){
            $rootScope.alertError("服务器列表,加载失败")
            console.log(err);
        });



        //控制切换
        $scope.currentPotoy = 1;


        //requrest报文
        $scope.jsonRequestProto  = "";
        //response报文
        $scope.jsonResponseProto  = "";



        //协议
//        $scope. requestproto =  true;
//        $scope. responseproto = true;





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


        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }


        //查询
        $scope.enter = function(ev){
            if (ev.keyCode !== 13) return;
            $scope.refresh = true;
        }




        //创建协议
        $scope.create = function(){
           $rootScope.alertModal("brige/tpl/add-bridge.html","AddBridgeCtrl");

        }

        //删除协议
        $scope.delete = function(note){

            $scope.notes.splice($scope.notes.indexOf(note), 1);
            if(note.selected){
                $scope.note = $scope.notes[0];
                $scope.notes.length && ($scope.notes[0].selected = true);
            }
        }

        //选择协议
        $scope.select = function(note){

            angular.forEach($scope.notes, function(note) {
                note.selected = false;
            });
            $scope.note = note;
            $scope.note.selected = true;
        }


    })

    .service("BridgeShare",function(){
          var  sv  = [];
        return  {
            initServers : function(serverList){
                sv = serverList;
            },
            getServers : function($scope){
                return sv;
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
                        $modalInstance.dismiss('cancel');
                    }
                    else{
                        $rootScope.alertError(res.resultDesc);
                    }
                },function(err){
                });

        }

    });