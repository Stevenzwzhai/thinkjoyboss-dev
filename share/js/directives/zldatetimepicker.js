/**
 * Created by shao on 15-1-28.
 */
App
    .directive("zldatetimepicker", function ($rootScope) {
        return {
            restrict: "AE",
            templateUrl: "share/tpl/directives/zldatetimepicker.html",
            scope: {
                currentdate: "="
            },
            link: function (scope, element, attrs) {

                var dateelement = element.children(0);
                var inputelement = dateelement.children(0);

                var dp = dateelement.datetimepicker({
                    defaultDate: "",
                    locale: 'zh-cn',
                    format: "YYYY-MM-DD HH:mm:ss"
                });

                dp.on("dp.change", function(e) {
                    scope.currentdate = e.date.format("YYYY-MM-DD HH:mm:ss");
                })
            }
        }
    })

