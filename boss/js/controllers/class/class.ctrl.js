App

    .controller("ClassCtrl", function ($rootScope, $scope,$state,$stateParams,$window, $log, $q, $timeout, ClassService,Util, SERVER) {

        console.log("class....");
        $scope.schoolId=$stateParams.schoolId ;

        //班级信息
        $scope.classMsgPosts = [];

        //每页显示信息数量
        $scope.pageSize = 10;


        $scope.classInfo = "";

        $scope.busy = false;

        $scope.isFirst = true;

        $scope.isContact = true;


        //form
        $scope.fm = {
            classCode : $stateParams.classId,
            userType : "-1",
            queryTime : 0
        }



        //监听
        $scope.$watch("fm.userType",function(res){
            if(res && !$scope.isFirst){

                $scope.isContact = false;
                $scope.isFirst = true;
                $scope.fm.queryTime = 0;
                $scope.classMsgPosts =  [];
                loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);
            }

        });


        //查询班级信息
        var loadClassMg = function(classCode,type,pageSize,queryTime){
            pageSize = pageSize || $scope.pageSize;
                ClassService.getClassMessageInfoByCode(classCode,type,pageSize,queryTime).then(function(res){

                    if(res.bizData.length <= 0){
                        console.log("没有！");
                        $scope.busy = false;
                        return;
                    }

                    if($scope.isContact){
                        $scope.classMsgPosts  = $scope.classMsgPosts.concat(res.bizData);
                        $scope.isFirst= false;
                        $scope.busy = false;
                    }
                    else{
                        $scope.classMsgPosts  = res.bizData;
                        $scope.isFirst= false;
                        $scope.busy = false;
                    }


                    $scope.fm.queryTime =  $scope.classMsgPosts[$scope.classMsgPosts.length-1].messageInfo.messageSendTime;
                    console.log($scope.fm.queryTime);

                },function(){

                    $scope.isFirst= false;
                    $scope.busy = false;

                });
        }



        var loadClassInfo = function(classCode){
            ClassService.getClassInfo(classCode).then(function(res){
                if(res.rtnCode != "0000000"){
                    $rootScope.alertError(res.msg);
                }
                else{
                    $scope.classInfo  =  res.bizData;
                }

            },function(){

            });
        }

        //查询班级
         $scope.searchClass = function(){
             console.log("search...");
             $scope.isContact = false;
             $scope.classMsgPosts =  [];
             $scope.fm.userType = "-1";
             $scope.fm.queryTime = 0;

             $scope.isFirst = false;

             loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);

             loadClassInfo($scope.fm.classCode);

        }



        if($stateParams.classId){
            $scope.searchClass(true);
            console.log("0k");
        }

        //load more
        $scope.loadMore = function(){

            console.log("more-init..",$scope.isFirst);

             if ($scope.busy) return;
             if($scope.isFirst) return;

                 console.log("load more..");
                 $scope.busy = true;
                 $scope.isContact = true;
                    $timeout(function(){
                        loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);
                    },1000);

        }


       // console.log($scope.schoolNum);

    });