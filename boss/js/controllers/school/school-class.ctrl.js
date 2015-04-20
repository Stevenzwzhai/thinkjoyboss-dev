App

    .controller("SchoolClassCtrl", function ($rootScope, $stateParams,$scope, $state, $window, $log, $q, $timeout, AuditService, Util, SERVER) {

        console.log("schoolClass....");

        var schoolId = parseInt($stateParams.schoolId);

        //学校地址
        $scope.classUrl = SERVER.url.uc + "/schoolBoss/getClassesBySchoolIdNoToken";

        //学校列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            style : "",
            clientInfo : {},
            data : {
                schoolId: schoolId
            }
        };

        $scope.isSubmit = false;

        //监听完成
        $scope.$watch("params.schoolName",function(newV){
            if(newV == ""){
                $scope.refresh = true;
            }
        });

        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }



        //创建学校
        $scope.create = function(){
            $rootScope.alertModal("boss/tpl/school/add-school.html","AddSchoolCtrl");
        }



        //修改学校
        $scope.edit = function(sco){
            //选中
            if(!sco.edit){
                sco.edit  = true;

            }
            //取消选中
            else{
               AuditService.updateSchool(sco.id,sco.schoolName).then(function(res){
                   $rootScope.alertSuccess(res.msg);
                   sco.edit  =false;

               }).then(function(){

                   sco.edit  =false;
               });
            }


        }



    });