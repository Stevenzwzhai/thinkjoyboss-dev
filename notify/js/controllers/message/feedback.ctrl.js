/**
 * Created by shao on 15-1-22.
 */
App

    .controller("FeedbackCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, Util, SERVER) {

        console.log("feedback....");

        //用户反馈地址
        $scope.feedbackUrl = SERVER.url.message + "/feedbackBoss/getFeedbacks";

        //用户反馈列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
        };

        $scope.isSubmit = false;
    });
