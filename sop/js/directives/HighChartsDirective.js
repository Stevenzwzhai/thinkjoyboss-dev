App.directive('highchart', function factory($q, user7TrendServie) {
    var myChart;
    return {
        restrict: 'AECM',
        link: function(scope, element){
            var   parent = $("#user7Trend");

            scope.$on("parent-resize",function(){

                var w = $("#user7Trend").width();
                var h = $("#user7Trend").height();

                myChart = $('#user7Trend_highchart');
                myChart.width(w);
                myChart.height(h);
            });

            function getHighCharts() {
                var delay = $q.defer();
                $.getScript('lib/vendor/libs/highcharts/4.0.4/highcharts.js', function(){
                    delay.resolve();
                });

                return delay.promise;
            }

            function initHighCharts() {
                var w = $("#user7Trend").width();
                var h = $("#user7Trend").height();

                myChart = $('#user7Trend_highchart');
                myChart.width(w);
                myChart.height(h);

                var promise = user7TrendServie.getEchartData();
                promise.then(function(data) {
                    myChart.highcharts({
                        title: {
                            text: '用户7日新增数'
                        },
                        xAxis: {
                            categories: data.categories
                        },
                        labels: {
                            items: [{
                                html: '7日新增占比',
                                style: {
                                    left: '50px',
                                    top: '18px',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                }
                            }]
                        },
                        series: [{
                            type: 'column',
                            name: '家长',
                            data: data.home
                        }, {
                            type: 'column',
                            name: '教师',
                            data: data.teacher
                        }, {
                            type: 'column',
                            name: '家长&教师',
                            data: data.homeAndTeacher
                        }, {
                            type: 'column',
                            name: '未选角色',
                            data: data.unknow
                        }, {
                            type: 'spline',
                            name: '平均值',
                            data: data.half,
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3],
                                fillColor: 'white'
                            }
                        }, {
                            type: 'pie',
                            name: '数目',
                            data: [{
                                name: '家长',
                                y: data.homeSum,
                                color: Highcharts.getOptions().colors[0] // Jane's color
                            }, {
                                name: '教师',
                                y: data.teacherSum,
                                color: Highcharts.getOptions().colors[1] // John's color
                            }, {
                                name: '家长&教师',
                                y: data.homeAndTeacherSum,
                                color: Highcharts.getOptions().colors[2] // Joe's color
                            }, {
                                name: '未选角色',
                                y: data.unknowSum,
                                color: Highcharts.getOptions().colors[3] // Joe's color
                            }],
                            center: [100, 50],
                            size: 70,
                            showInLegend: false,
                            dataLabels: {
                                enabled: true
                            }
                        }]
                    });
                });


            }

            getHighCharts()
                .then(initHighCharts,function(err){
                    console.log(err);
                });
        }
    }

});