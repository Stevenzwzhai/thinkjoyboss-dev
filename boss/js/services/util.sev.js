//uc 对接

App

    .factory("Util", function () {


        var Util = {

            caclTotal : function($scope){
                console.log("ddd");
                var size   = parseInt($scope.pageSize);
                var total  = parseInt($scope.pageTotal);
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
                var index   = parseInt($scope.pageIndex);
                var total  = parseInt($scope.pageTotal);

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