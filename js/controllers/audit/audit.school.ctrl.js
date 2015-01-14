App

    .controller("AuditSchoolCtrl", function ($rootScope,$scope, $window, $log, $q, $timeout,AuditService,Util) {

        console.log("school...")

        //$scope.$parent.isSchool = true;
        console.log($scope.$parent.isSchool);


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
                    $scope.results = res.bizData.pageList;
                }

            }, function (err) {
                alert("服务器连接失败!");
            });

        }

        //接受来自audit的事件
        $scope.$on("audit-child",function(event,data){
            console.log("子id : ",data);
            //默认数据
            loadList(getParams(),data.isFirst);
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
                areaId : $scope.$parent.fm.areaId,
                schoolId : $scope.$parent.fm.schoolId,
                pageIndex : $scope.pageIndex-1,
                pageSize  :  $scope.pageSize,
                status    :  ""
            }
        }


        //默认数据
       loadList(getParams(),true);
    });