App

    .controller("AuditClassCtrl", function ($rootScope,$scope, $window, $log, $q, $timeout, AuditService,Util) {

        console.log("class..");


        $scope.$parent.isSchool = false;

        console.log($scope.$parent.isSchool);


        //查询班级
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
                alert("网络出错!");
            });
        }

        var schoolId;

        if(!$scope.fm.school)
            schoolId = ""
        else
            choolId = $scope.fm.school.schoolId || "";

        var areaId   = $scope.fm.areaId || "";

        //接受来自audit的事件
        $scope.$on("audit-child",function(event,data){
            console.log("子id : ",data);
            loadList(getParams(),data.isFirst);
        });

        var getParams = function(){
            return  {
                areaId : $scope.$parent.fm.areaId,
                schoolId : $scope.$parent.fm.schoolId,
                pageIndex : $scope.pageIndex-1,
                pageSize  :  $scope.pageSize,
                status    :  ""
            }
        }

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


        //默认数据
        loadList(getParams(),true);


    });