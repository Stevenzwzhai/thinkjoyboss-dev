App

    .controller("SchoolCtrl", function ($rootScope,$scope,$window,$log,$q,$timeout,AuditService) {
        console.log("school...");
        $scope.pageTotal = "";

        var  loadList = function(isFirst){
            AuditService.getSchool({areaId:"",schoolId:""}).then(function (res) {
                if(res.rtnCode != "0000000"){
                    alert(res.msg);
                }
                else{
                    if(isFirst){
                        $scope.pageTotal  = res.bizData.total;
                        isFirst = false;
                    }
                    $scope.results = res.bizData.pageList;
                }

            }, function (err) {
                $rootScope.alertError("服务器连接失败!");
            });
        }
        loadList(true);

    });