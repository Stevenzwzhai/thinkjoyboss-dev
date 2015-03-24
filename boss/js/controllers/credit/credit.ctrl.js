/**
 * Created by shao on 15-1-22.
 */
App

    .controller("CreditCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, Util, SERVER) {

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

        $scope.isSubmit = false;
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
