App

    .controller("MainCtrl", function ($rootScope,$scope,$window,SERVER) {


        $scope.dev = "测试环境";
        SERVER.url = SERVER.testUrl;


        $scope.goFeedBack = function(){
            $window.open("http://115.29.184.78:9001/v1/feedback/view/feedback.html");
        }

        $scope.toggleDev = function(){
            //切正式
            if($scope.dev == "测试环境"){
                SERVER.url =  SERVER.formalUrl;
                $scope.dev = "正式环境";
            }
            //切测试
            else{
                SERVER.url =  SERVER.testUrl;
                $scope.dev = "测试环境";
            }
        }
    });