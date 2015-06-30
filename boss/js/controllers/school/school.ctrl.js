App

    .controller("SchoolCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, AuditService, Util, SERVER) {

        console.log("school....");
        console.log($scope.pageSize);

        $scope.fm = {
            areaId: "",
            address: "",
            school: "",
            schoolId : ""

        };
        $scope.params = {
                schoolName: ""

            }



        $rootScope.$watch("change",function(newVal,oldVal){


            if(newVal){
                if (!$scope.chg) {

                    $scope.chg = true;
                    $scope.params=$scope.fm;
                    $scope.schoolUrl = SERVER.url.uc + "/schoolBoss/searchSchoolByAreaId";

                }
            }

            else{

                $scope.chg = false;
                $scope.search();
                $scope.schoolUrl = SERVER.url.uc + "/schoolBoss/searchSchoolByName";
                $scope.params = {
                    schoolName: ""

                }

            }


        });

        //学校地址
        $scope.schoolUrl = SERVER.url.uc + "/schoolBoss/searchSchoolByName";

        //学校列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数


        $scope.isSubmit = false;

        //监听完成
        $scope.$watch("params.schoolName",function(newV){
            if(newV == ""){
                $scope.refresh = true;
            }
        });

        //查询
        $scope.search = function () {
            $scope.refresh = true;
        }



        //创建学校
        $scope.create = function(){
            $rootScope.alertModal("boss/tpl/school/add-school.html","AddSchoolCtrl");
        }


        //修改学校
        $scope.edit = function(sco){
            //选中
            if(!sco.edit){
                sco.edit  = true;

            }
            //取消选中
            else{
               AuditService.updateSchool(sco.id,sco.schoolName).then(function(res){
                   $rootScope.alertSuccess(res.msg);
                   sco.edit  =false;

               }).then(function(){

                   sco.edit  =false;
               });
            }


        }




        //表单数据


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



        $scope.$watch("fm.address",function(newV){
            if(newV){
                if($scope.fm.areaId){
                    $scope.refresh = true;
                    console.log('aaa');
                    console.log($scope.fm.areaId);
                }

            }

        });
    });