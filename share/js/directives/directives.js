App

    .directive("tablePaging", function ($http,$rootScope,Util) {
        return {
            restrict: "AE",
            templateUrl: "share/tpl/directives/tabPaging.html",
            transclude: true,
            scope: {
                params: "=",
                url: "=",
                results : "=",
                refresh : "=",
                isSubmit : "="
            },
            link: function (scope, element, attrs) {

                var resNameArray = element.attr("resultsName").split(".");
                var totalArray   = element.attr("total").split(".");

                scope.pageIndex =  element.attr("pageIndex");
                scope.pageSize =   element.attr("pageSize");


                var getReName = function(resNameArray,res){

                    for(var i= 0; i<resNameArray.length;i++){
                        if(resNameArray.length == 1){
                            return res[resNameArray[0]];
                        }
                        else if(resNameArray.length == 2){
                            return res[resNameArray[0]][resNameArray[1]]
                        }
                    }

                }




                scope.$watch("refresh",function(newD,oldD){

                    if(newD){
                        loadList(true);
                        scope.pageIndex = 1;
                    }

                });


                var loadList = function (isFirst) {

//                    var index = (scope.pageIndex-1) * scope.pageSize;
                    var index = scope.pageIndex - 1;
                    var  params = angular.extend([],{pageIndex:index,pageSize:scope.pageSize},scope.params);

                    scope.isSubmit = true;

                    $http.get(scope.url, {
                        params:  params
                    })
                    .success(function (res) {

                        //加载结果集
                        scope.results = getReName(resNameArray,res);


                        if(isFirst){
                            //分页
                            scope.pageTotal = getReName(totalArray,res);
                           Util.caclTotal(scope);
                        }

                            scope.isSubmit = false;


                    })
                    .error(function () {
                          $rootScope.alertError("网络错误！");
                            scope.isSubmit = false;
                    });


                    scope.refresh = false;

                }

                loadList(true);


                var $page = element.find(".pager");

                //上一页
                $page.find(".previous > button").click(function(){
                    Util.calcPage(scope,"prev");
                    loadList();


                });

                //下一页
                $page.find(".next > button").click(function(){
                    Util.calcPage(scope,"next");
                    loadList();

                });



            }
        }
    })




