App

    .controller("UpDataCredit", function ($rootScope,$scope,$stateParams, $modalInstance,Util,CreditService,SERVER) {
        console.log("upDataCredit....");
        $scope.phone=  Util.getSg("pn");
        $scope.credit={
            newData : "",
            reason : ""
        }

        $scope.upDataCredit = function(){

            CreditService.updateCredit($scope.phone,$scope.credit.newData,$scope.credit.reason).then(function(res){
                if(res.rtnCode == "0000000"){
                    $rootScope.alertSuccess("","更新成功");
                    //$modalInstance.dismiss();
                    $modalInstance.close({newData:$scope.credit.newData});

                    //通知
                    $rootScope.$broadcast("updateCredit",function(){

                    });
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