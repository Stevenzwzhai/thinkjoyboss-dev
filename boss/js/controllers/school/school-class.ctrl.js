App

    .controller("SchoolClassCtrl", function ($rootScope, $stateParams,$scope, $state, $window, $log, $q, $timeout, AuditService, Util, SERVER) {

        console.log("schoolClass....");

       // $scope.$parent.$parent.$parent.isSchool = false;


        $scope.fm = {
            address: "",
            school: "",
            schoolId : parseInt($stateParams.schoolId)

        }
        //console.log(parseInt($stateParams.schoolId));
        $scope.isFirst = true;
        //分页数据
        $scope.pageIndex = 1;
        $scope.pageSize = 8;


        //是否显示新信息
        $scope.isMsgShow = false;

        //省数据
        $scope.provices = [];





        //
        var schoolId = parseInt($stateParams.schoolId);

        //学校地址
        $scope.classUrl = SERVER.url.uc + "/schoolBoss/getClassesBySchoolIdNoToken";

        //学校列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            style : "",
            clientInfo : {},
            data : {
                schoolId: schoolId
            }
        };

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


        //查找班级
        var loadList = function (data,isFirst) {

            AuditService.getUserClass(data).then(function (res) {
                if(res.rtnCode != "0000000"){
                    alert(res.msg);
                }
                else{

                    if(isFirst){
                        $scope.pageTotal  = res.bizData.total;
                        Util.caclTotal($scope);
                        isFirst = false;
                    }
                    $scope.results = res.bizData.pageList;
                }

            }, function (err) {
                $rootScope.alertError("网络出错!");
            });
        }



        //接受来自audit的事件
        $scope.$on("audit-child",function(event,data){
            console.log("子id : ",data);

            loadList(getParams(),data.isFirst);
        });

        var getParams = function(){
            return  {
                schoolId :  $scope.fm.schoolId,
                pageIndex : $scope.pageIndex-1,
                pageSize  :  $scope.pageSize,
                status    :  ""
            }
        }

        //分页
        $scope.next = function(){
            Util.calcPage($scope,"next");
            var params = getParams();
            loadList(params);
        }



        $scope.prev = function(){
            Util.calcPage($scope,"prev");
            var params = getParams();
            loadList(params)
        }
        var getParams = function(){
            return  {
                schoolId :  $scope.fm.schoolId,
                pageIndex : $scope.pageIndex-1,
                pageSize  :  $scope.pageSize,
                status    :  ""
            }
        }
        loadList(getParams(),true);



    });