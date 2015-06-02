/**
 * Created by shao on 15-1-22.
 */
App

    .controller("SendMessageCtrl", function ($rootScope, $scope, $state,  $q, $timeout, MessageService,AuditService,Util, SERVER) {

        console.log("SendMessageCtrl....");

        //发布对象类型
        $scope.sendUserTypes  = [
            {
                content : "班级",
                type  : "0"
            },
            {
                content  : "用户",
                type  : "1"
            }
        ];

        //form
        $scope.fm = {
             "userType" : "",
             receiversClass : "",
             receiversUser : "",
             schoolName : "",
             schoolId : ""

        }

        $scope.isopen = false;

        //学校列表
        $scope.schools = [];
        $scope.classList =[];


        //查询学校
        $scope.searchSchool  = function(m){
            if(!$scope.fm.schoolName){
                return;
            }
            var data = {
                pageIndex : 0,
                pageSize  :  10,
                schoolName    :  $scope.fm.schoolName
            }
            AuditService.getSchoolByName(data).then(function(res){
                var list = res.bizData.pageList;
                if(list.length > 0){
                    $scope.schools = res.bizData.pageList;
                    $scope.isopen = true;
                }
                else{
                    $rootScope.alertInfo("学校不存在!");
                    $scope.isopen = false;
                }
            },function(){

            });

        }

        //查询班级
        $scope.searchClass  = function(){
            if(!$scope.fm.schoolId){
                return;
            }
            var data = {
                style : "",
                data : {
                    pageIndex : 0,
                    pageSize  : 10,
                    schoolId  : $scope.fm.schoolId
                },
                clientInfo  : {}
            }
            AuditService.getClassByName(data).then(function(res){
                $scope.classList = res.bizData;

            },function(){});

        }



        $scope.selectSchool = function(sc){
            $scope.fm.schoolId = sc.schoolId;
            $scope.fm.schoolName = sc.schoolName;
            $scope.isopen = false;
            $scope.searchClass();
        }



    });
