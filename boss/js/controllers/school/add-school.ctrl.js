App

    .controller("AddSchoolCtrl", function ($rootScope, $scope,  $modalInstance,Util,AuditService,SERVER) {

        console.log("add school....");


        //表单数据
        $scope.fm = {
            areaId: "",
            schoolType: "",
            address: "",
            schoolName : ""
        }


        $scope.schoolTypeArray = [];


        $scope.isAddSchoolSubmit = false;

        //获得学校类型
        AuditService.getSchoolTypes().then(function(res){
            $scope.schoolTypeArray = res.bizData;
        },function(err){
        });

        /**
         * 添加学校
         */
        $scope.addSchool = function(){


            $scope.isAddSchoolSubmit = true;
            var schoolName = $scope.fm.schoolName;
            var schoolTypeId = $scope.fm.schoolType;
            var areaId  = $scope.fm.areaId;

            schoolTypeId = parseInt(schoolTypeId);

            AuditService.addSchool(schoolName,schoolTypeId,areaId,$rootScope.token).then(function(res){
                if(res.rtnCode == "0000000"){
                    $rootScope.alertSuccess("","学校添加成功!");
                    $modalInstance.dismiss();
                }
                else {
                    $rootScope.alertError("",res.msg);
                }
                $scope.isAddSchoolSubmit = false;

            },function(err){
                $scope.isAddSchoolSubmit = false;
            });

        }

    });