App

    .controller("MainCtrl", function ($rootScope,$scope,$window) {

        $scope.goFeedBack = function(){
            $window.open("http://115.29.184.78:9001/v1/feedback/view/feedback.html");
        }


    });