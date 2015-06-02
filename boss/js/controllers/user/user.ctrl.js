App

    .controller("UserCtrl", function ($rootScope,$scope,$stateParams, $state, $window,$log,$q,$timeout,$filter,Util,UserService,CreditService) {


        var newCre=0;
        $scope.edit=false;
        console.log($stateParams.phone);
        //提交的表单
        $scope.form = {
            phone : $stateParams.phone,
            submit   : false,
            token  : ""
        }
        $scope.userName="";
        $scope.userType="";
        $scope.bizData=""
        $scope.userAdd="";
        $scope.userSex="";


        $scope.$watch("form.phone",function(old){
                if(!old){
                    $scope.res = "";
                }
        });

        $scope.delUser = function(){
            $scope.form.submit = true;
            var phone = $scope.form.phone.trim();

            var ques=window.confirm("确实要删除此  "+$scope.form.phone+" 吗？")


            if(ques){
                UserService.deletePhone(phone).then(function(result){
                    alert(result.msg);
                    $scope.form.submit = false;
                },function(err){
                    $rootScope.alertError("网络错误！");
                    $scope.form.submit = false;
                });

            }
            else{
                $scope.form.submit = false;
            }


        }

        $scope.delChild = function(child){
            var ques=window.confirm("确实要删除孩子  "+child.childName+"  吗？")
            if(ques){
                UserService.deleteChild(child.childId).then(function(result){
                    $rootScope.alertSuccess(result.msg);
                    $scope.seachUser();
                },function(err){
                    $rootScope.alertError("网络错误！");
                });

            }
            else{
            }

        }

        $scope.creadte=function(){

        }

        $scope.seachUser = function(){

            $scope.form.submit = true;
            var phone = $scope.form.phone.trim();
            UserService.getUserInfo(phone).then(function(res){

                if(res.rtnCode == "0000000"){
                    if(res.bizData.userInfo){
                        res = res.bizData;
                        $scope.userType=res.userInfo.userType;
                        $scope.userName=res.userInfo.userName;
                        $scope.userAdd=res.userInfo.address;
                        $scope.userSex=res.userInfo.sex;
                        //console.log($scope.userType);
                    }
                    else{
                        res = "";
                    }
                }
                else if(res.rtnCode == "1000003"){
                    $rootScope.alertError("该用户不存在 或 手机号码错误！");
                    res = "";
                }

                $scope.res = res;

                $scope.form.submit = false;
            },function(err){
                $rootScope.alertError("网络错误！");
                $scope.form.submit = false;
            });





            CreditService.queryCreditByPhone(phone).then(function(res){

                if(res.rtnCode == "0000000"){

                    //console.log(res.bizData);
                    $scope.bizData=res.bizData;
                    //console.log( $scope.form.phone.trim());
                    $scope.form.phone =phone;

                }
                else{
                    $rootScope.alertError(res.msg);
                }

            },function(err){
                $rootScope.alertError("server error！");

            })

        }


        if($stateParams.phone){
            $scope.seachUser();
        }

        //修改积分
        $scope.upDataCredit=function(){
            Util.setSg("pn",$scope.form.phone);
            $rootScope.alertModal("boss/tpl/user/upDataCredit.html","UpDataCredit").result
                      .then(function (obj) {
                    $scope.bizData +=obj.newData;
                }, function () {
                                //$log.info('Modal dismissed at: ' + new Date());
                            });

            console.log('ok');
        }



        $scope.editCre = function(){
            //选中
            if(! $scope.edit){
                    $scope.edit  = true;

            }
            //取消选中
            else{

                $scope.edit  =false;
                UserService.updateUserInfo($scope.form.phone).then(function(result){
                    $scope.edit  =false;

                }).then(function(){
                    $scope.edit  =false;
                });
                //console.log($scope.edit);
            }


        }


    });
