App

    .controller("ClassCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, ClassService, Util, SERVER) {

        console.log("class....");


        //班级信息
        $scope.classMsgPosts = [];

        //每页显示信息数量
        $scope.pageSize = 10;


        //form
        $scope.fm = {

            classCode : ""

        }

        //查询班级信息
        var loadClassMg = function(classCode,type,pageSize){

            pageSize = pageSize || $scope.pageSize;
            if(type == "all"){
                ClassService.getClassMessageInfoByCode(classCode,pageSize).then(function(res){
                    $scope.classMsgPosts  =  res.bizData;
                },function(){

                });
            }
        }


        //查询班级
        var searchClass = function(){
            loadClassMg($scope.fm.classCode,"all",$scope.pageSize);
        }


    });