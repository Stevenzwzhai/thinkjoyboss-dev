App

    .directive("userCard", function ($http,$rootScope,UserService,Util) {
        return {
            restrict: "E",
            templateUrl: "share/tpl/directives/userCard.html",
            transclude: true,
            scope: {
                phone : "=",
                data   : "="
            },
            link: function (scope, element, attrs) {
                console.log("userCard");
                var  phoneWatch = scope.$watch("phone",function(newVal,oldVal,scope){
                    if(newVal){
                        element.show();
                        console.log(newVal);
                        update(newVal);
                    }
                });


                //关闭遮罩
                element.find(".mask-glass").click(function(){
                    delete scope.post;
                    scope.phone = "";
                    scope.$apply();
                    element.hide();

                });

                //更新内容
                var update = function(phone){
                    UserService.getUserInfo(phone).then(function(res){
                        if(res.rtnCode == "0000000"){
                            scope.post = res.bizData;
                        }
                        else if(res.rtnCode == "1000003"){
                            $rootScope.alertError("该用户不存在 或 手机号码错误！");
                        }
                    },function(err){

                    });
                }

            }
        }
    })







