App

    .controller("UpDataCredit", function ($rootScope,$scope,$stateParams, $modalInstance,Util,CreditService,SERVER) {


        console.log("upDataCredit....");

        $scope.phone=$stateParams.phone;
        $scope.credit={
            newData : "",
            reason : ""
        }


        $scope.upDataCredit = function(){



            CreditService.updateCredit($scope.phone,$scope.credit.newData,$scope.credit.reason).then(function(res){
                if(res.rtnCode == "0000000"){
                    $rootScope.alertSuccess("","积分修改成功!");
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