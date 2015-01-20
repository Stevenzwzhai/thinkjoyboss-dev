App

    .controller("SchoolCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, AuditService, Util, SERVER) {

        console.log("school....");

        //学校地址
        $scope.schoolUrl = SERVER.url.uc + "/schoolBoss/searchSchoolByName";
        //学校列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            schoolName: ""
        };


        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }



    });