/**
 * Created by shao on 15-1-22.
 */
App

    .controller("SMSChannelCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout) {

        console.log("sms....");

        //短信地址
        $scope.smsUrl = SERVER.url.push + "/sms/nglist";

        //短信列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            phone: ""
        };

        $scope.isSubmit = false;

        //监听完成
        $scope.$watch("params.phone",function(newV){
            if(newV == ""){
                $scope.refresh = true;
            }
        });

        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }
});