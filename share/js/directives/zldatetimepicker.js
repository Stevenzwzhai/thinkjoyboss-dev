/**
 * Created by shao on 15-1-28.
 */
App
    .directive("zldatetimepicker", function ($rootScope) {
        return {
            restrict: "AE",
            scope: {
                currentdate: "="
            },
            link: function (scope, element, attrs) {


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

