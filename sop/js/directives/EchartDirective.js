App.directive('echart', function factory($q, Map) {
    var myChart;
    return {
        restrict: 'AECM',
        link: function(scope, element){
            function getEcharts() {
                var delay = $q.defer();
                $.getScript('lib/vendor/libs/echarts/2.1.10/echarts-all.js', function(){
                    delay.resolve();
                });

                return delay.promise;
            }

            function initEcharts() {
                var w = $("#echart").width();
                var h = $("#echart").height();

                var $chart = $('#chart');
                $chart.width(w);
                $chart.height(h);

                myChart = window.echarts.init($chart[0]);
                myChart.showLoading();


                scope.$on("parent-resize",function(){

                    var w = $("#echart").width();
                    var h = $("#echart").height();

                    $chart.width(w);
                    $chart.height(h);

                    myChart.resize();
                });


                var promise = Map.getEchartData();
                promise.then(function(data) {
                    scope.mapOption.series[0].data = data.home;
                    scope.mapOption.series[1].data = data.teacher;
                    scope.mapOption.series[2].data = data.homeAndTeacher;
                    scope.mapOption.series[3].data = data.unknow;

                    myChart.setOption(scope.mapOption);
                    myChart.hideLoading();
                });
            }

            getEcharts()
                .then(initEcharts,function(err){
                    console.log(err);
                });
        }
    }

});