/**
 * Created by shao on 15-1-22.
 */
App

    .controller("CreditCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, Util, SERVER,CreditService) {

        console.log("CreditCtrl....");

        //用户反馈地址
        $scope.creditUrl = SERVER.url.credit + "/boss/queryExchangeProductionList";

        //用户反馈列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            style : "",
            clientInfo : {},
            data : {
            }
        };

        $scope.fm = {
            phone : ""
        }

        $scope.isSubmit = false;

        //显示用户card
        $scope.userCard = function(post){
            $scope.fm.phone = post.exchangePhone;
        }


        //兑换状态
        $scope.changeStatus = function(sco){

            var ques=window.confirm("确定要完成兑换  "+sco.goodsName+"  吗？");

            if(ques){
                //数据修改
                CreditService.toggleStatus(sco.status,sco.orderNumber).then(function(res){
                    if(res.rtnCode == "0000000"){
                        $rootScope.alertSuccess("","完成兑换!");
                    }
                    else {
                        $rootScope.alertError("",res.msg);
                        sco.status = 0;
                    }

                },function(err){
                    sco.status = 0;

                });
            }
            else{
                sco.status = 0;
            }


        }
    });

App.filter("creditFilterStatus",function(){
    return function(status) {
        if(status == 0){
            return "(配送中、充值中)";
        }
        else{
            return "已完成";
        }
    };
})
