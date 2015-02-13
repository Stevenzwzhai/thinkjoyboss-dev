App

    .controller("ClassCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, ClassService,Util, SERVER) {

        console.log("class....");

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
            classCode : "14100",
            userType : "-1",
            queryTime : 0
        }

        var  msgPic  = [
            "http://i2.tietuku.com/030735a8a54241c9.jpg",
            "http://i2.tietuku.com/7955f088b5561205.jpg",
            "http://i2.tietuku.com/947d4df5ea8c7434.jpg",
            "http://i2.tietuku.com/43ce0a6e07897c7d.jpg"
        ]



        //监听
        $scope.$watch("fm.userType",function(res){
            if(res){

                $scope.isContact = false;
                $scope.isFirst = true;
                $scope.queryTime = 0;
                $scope.classMsgPosts =  [];
                loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);

            }


        });

        //查询班级信息
        var loadClassMg = function(classCode,type,pageSize,queryTime){
            pageSize = pageSize || $scope.pageSize;
                ClassService.getClassMessageInfoByCode(classCode,type,pageSize,queryTime).then(function(res){

                    if(res.bizData.length == 0){
                        $scope.busy = true;
                        return;
                    }

//                    if($scope.isContact){
//
//                        $scope.classMsgPosts  = $scope.classMsgPosts.concat(res.bizData);
//                        $scope.isFirst= false;
//                        $scope.busy = false;
//
//
//
//
//
//                    }
//                    else{
//                        $scope.classMsgPosts  = res.bizData;
//                        $scope.isFirst= false;
//                        $scope.busy = false;
//                    }

                    $scope.classMsgPosts  = $scope.classMsgPosts.concat(res.bizData);
                    $scope.isFirst= false;
                    $scope.busy = false;


                    $scope.fm.queryTime =  $scope.classMsgPosts[$scope.classMsgPosts.length-1].messageInfo.messageSendTime;
                    console.log($scope.fm.queryTime);


                },function(){

                    $scope.isFirst= false;
                    $scope.busy = false;

                });

        }

        var loadClassInfo = function(classCode){
            ClassService.getClassInfo(classCode).then(function(res){
                $scope.classInfo  =  res.bizData;
            },function(){

            });
        }


        //查询班级
         $scope.searchClass = function(){
             console.log("search...");
             loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);
             loadClassInfo($scope.fm.classCode);

        }


        $scope.loadMore = function(){
                console.log("load more..");
                if ($scope.busy) return;
                    $scope.busy = true;
                    loadClassMg($scope.fm.classCode,$scope.fm.userType,$scope.pageSize,$scope.fm.queryTime);


        }










    });