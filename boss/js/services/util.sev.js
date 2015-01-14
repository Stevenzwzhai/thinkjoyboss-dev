//uc 对接

App

    .factory("Util", function ($http, $q, SERVER) {


        var Util = {

            caclTotal : function($scope){
                var size   = $scope.pageSize;
                var total  = $scope.pageTotal;
                var  currentPage;
                if( total %  size   == 0){
                    currentPage = total / size;
                }
                else{
                    currentPage  = parseInt(total / size) + 1;
                }
                $scope.pageTotal = currentPage;
            },

            calcPage : function($scope,opear){
                var index   = $scope.pageIndex;
                var total  = $scope.pageTotal;

                if(opear == "next"){
                    index++;
                    if(index >  total){
                        index = total;
                    }
                }
                else if( opear == "prev"){
                    index--;
                    if(index < 1){
                        index = 1;
                    }
                }
                $scope.pageIndex = index;
            }



        };

        return Util;

    });