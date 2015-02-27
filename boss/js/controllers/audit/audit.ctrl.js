App

    .controller("AuditCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, AuditService,Util) {


        //表单数据
        $scope.fm = {
            areaId: "",
            address: "",
            school: "",
            schoolId : ""

        }


        //分页数据
        $scope.pageIndex = 1;
        $scope.pageSize = 8;


        //是否显示新信息
        $scope.isMsgShow = false;

        //省数据
        $scope.provices = [];
        $scope.citys = [];

        //学校数据
        $scope.schools = [];

        //学校
        $scope.isSchool = true;


        //地区进行筛选
        $scope.$watch('fm.areaId', function (areaId) {

            if (areaId) {
                console.log("area...");
                if (areaId == "-1") {
                    areaId = "";
                }
                //向子$scope 传递事件告可以刷新列表了
                $scope.$broadcast("audit-child", {areaId: areaId, schoolId: $scope.fm.school.schoolId});

                //非学校加载
                if (!$scope.isSchool) {
                    //加载学校列表
                    AuditService.getSchool(
                        {
                            areaId : areaId,
                            schoolId : "",
                            status    :  "",
                            pageIndex : -1,
                            pageSize  : -1
                        }
                    ).then(function (res) {
                        $scope.schools = res.bizData.pageList;
                    }, function (err) {

                    });
                }

            }
            else {
                $scope.showSecond = false;

            }
        });



        //学校筛选
        $scope.$watch('fm.school', function (school) {

            if (school) {
                $scope.fm.schoolId = school.schoolId
                //向子$scope 传递事件告诉可以刷新列表了
                $scope.$broadcast("audit-child",{});
            }
            else {
                $scope.fm.schoolId = "";
                $scope.$broadcast("audit-child",{});
            }
        });


        //修改学校
        $scope.updateSchool = function () {
            $scope.isMsgShow = false;
        }

        //显示学校
        $scope.showSchool = function () {
            $scope.isMsgShow = true;

        }

        //选择省
        $scope.selectProvice = function ($item, $model, $label) {
            console.log($item);
        }

        //审核
        $scope.auditContent = function (id, type,status) {
            AuditService.audit(id, type,status).then(function (res) {

                if(res.rtnCode == "0000000"){
                    //向子$scope 传递事件告诉可以刷新列表了
                    $scope.$broadcast("audit-child", {areaId: $scope.fm.areaId, schoolId: $scope.fm.school == "" ?  "" : $scope.fm.school.schoolId});
                }
                else{
                    alert(res.msg);
                }

            }, function (err) {
                $rootScope.alertError("服务器连接失败!");
            });
        }


        //跳转页面
        $scope.auditJumpPage = function(num){
            var temp;
            if(num == '0'){
                temp = "school";
            }
            else if(num == "1"){
                temp = "class";
            }
            else if(num == "2"){
                temp = "subject";
            }
            $state.go("app.boss.audit."+temp);
        }


    });