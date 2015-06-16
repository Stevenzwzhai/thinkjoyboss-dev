App

    .controller("SchoolCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, AuditService, Util, SERVER) {

        console.log("school....");

        $scope.params = {
            schoolName: ""
        };
        $scope.fm = {
            areaId: "",
            address: "",
            school: "",
            schoolId : ""

        };



        //change
        //$scope.ph="例: 西安市*小学";
        //$scope.model=$scope.fm.address;
        $rootScope.$watch("change",function(newVal,oldVal){


            if(newVal){
                if (!$scope.chg) {
                    $scope.chg = true;
                    //loadList(getParams(),true);
                    //$scope.results = res.bizData.pageList;
                    $scope.ph="请选择所在地";
                    $scope.model=$scope.fm.address;
                }
            }

            else{
                $scope.chg = false;
                $scope.search();
                $scope.ph="例: 西安市*小学";
                $scope.model=$scope.params.schoolName;
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



        //查询学校
        var loadList = function (data,isFirst) {
            var  areaId = data.areaId || "";

            //查询全部学校
            AuditService.getSchool(data).then(function (res) {
                if(res.rtnCode != "0000000"){
                    alert(res.msg);
                }
                else{
                    if(isFirst){
                        $scope.pageTotal  = res.bizData.total;
                        Util.caclTotal($scope);
                        isFirst = false;
                    }
                    $scope.posts = res.bizData.pageList;
                }

            }, function (err) {
                $rootScope.alertError("服务器连接失败!");
            });

        }

        //接受来自audit的事件
        $scope.$on("audit-child",function(event,data){
            console.log("子id : ",data);
            //默认数据
            if($scope.fm.address){

                loadList(getParams(),data.isFirst);
            }
        });

        //分页
        $scope.next = function(){
            Util.calcPage($scope,"next");
            var params = getParams();
            loadList(params)
        }

        $scope.prev = function(){
            Util.calcPage($scope,"prev");
            var params = getParams();
            loadList(params)
        }


        var getParams = function(){
            return  {
                areaId : $scope.fm.areaId,
                schoolId : $scope.fm.schoolId,
                pageIndex : $scope.pageIndex-1,
                pageSize  :  $scope.pageSize,
                status    :  ""
            }
        }


        //默认数据


















    });