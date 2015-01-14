jboss

 .directive("loadingBar",function(){
         return {
            restrict : "AE",
            template : '<div class="text-center"> <div  ng-hide="isShow" ng-transclude></div> <div  ng-show="isShow" class="spinner ib"> ' +
                        '<div class="bounce1"></div>'+
                        '  <div class="bounce2"></div>'+
                        '<div class="bounce3"></div>'+
                        '</div></div>',
            transclude: true,
            scope : {
                isShow : '='
            },
            link : function(scope,element,attrs){
                console.log(scope.isShow);
            }
         }
    })


