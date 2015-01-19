App
.directive("tablePaging",function(Util){
        return {
            restrict : "AE",
            templateUrl : 'share/tpl/directives/tablePaging.html',
            transclude: true,
            scope : {
                pageIndex : "@",
                pageSize  : "@",
                pageTotal : "="
            },
            link : function(scope,element,attrs){

                scope.$watch("pageTotal",function(newV,oldV){
                    if(newV && newV != oldV){
                        Util.caclTotal(scope);
                        console.log(scope.pageTotal);
                    }

                });

            }
        }
    })


