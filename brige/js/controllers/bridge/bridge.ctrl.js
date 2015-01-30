App

    .controller("BridgeCtrl", function ($rootScope, $modal,$scope, $state, $window, $log, $q, $timeout, BridgeService,Util) {

            console.log("bridge.....");

        $scope.posts =[

            {
                "url" : "http:///www.baidu.com/login",
                "color" : "primary",
                "desc" : "这是注册使用的",
                "type" : "post"
            },
            {
                "url" : "http:///www.google.com/register",
                "color" : "success",
                "desc" : "这是登录使用的",
                "type" : "get"
            }

        ];




        //服务列表
        $scope.serves = [];

        //url列表
        $scope.urls = [];

        //加载服务器列表
        BridgeService.getServerList().then(function(res){
            $scope.serves = res;
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



        // set default note
        $scope.note = $scope.posts[0];
        $scope.posts[0].selected = true;
        $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];




        //查询url列表
        $scope.findUrlList = function(url,sysCode,pageIndex,pageSize){

            url   = url || "";
            sysCode = sysCode || "";
            pageIndex =   pageIndex || 0;
            pageSize  =   pageSize || 10;
            BridgeService.getUrlList(url,sysCode,pageIndex,pageSize).then(function(res){
                $scope.posts = res.pageList;
            },function(err){
                $rootScope.alertError("url列表,加载失败")
                console.log(err);
            });
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



        //load
        $scope.findUrlList();

    })


    //add bridge
    .controller("AddBridgeCtrl", function ($rootScope, $modalInstance,$modal,$scope, $state, $window, $log, $q, $timeout, AuditService,Util) {
            console.log("add bridge");


        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    });