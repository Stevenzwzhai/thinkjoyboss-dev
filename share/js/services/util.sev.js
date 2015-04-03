//uc 对接

App

    .factory("Util", function ($window) {


        var Util = {

            caclTotal : function($scope){
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
            },

            getSgObj: function (key) {
                var obj = $window.sessionStorage.getItem(key);
                return  JSON.parse(obj);
            },
            setSgObj: function (key, value) {
                return $window.sessionStorage.setItem(key, JSON.stringify(value));
            },

            getSg: function (key) {
               return  $window.sessionStorage.getItem(key);
            },

            setSg: function (key, value) {
                $window.sessionStorage.setItem(key, value);
            },
            remove : function(key){
                $window.sessionStorage.removeItem(key);
            },

            getLgObj: function (key) {
                var obj = $window.localStorage.getItem(key);
                return  JSON.parse(obj);
            },
            setLgObj: function (key, value) {
                return $window.localStorage.setItem(key, JSON.stringify(value));
            },
            getLg: function (key) {
                return $window.localStorage.getItem(key);
            },

            setLg: function (key, value) {
                $window.localStorage.setItem(key, value);
            },
            removeLg : function(key){
                $window.localStorage.removeItem(key);
            }


        };

        return Util;

    });