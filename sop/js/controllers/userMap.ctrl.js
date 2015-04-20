App.controller("userMapCtrl", function ($rootScope,$scope,$window,$log,$q,$timeout, SERVER) {
    $scope.SERVER = SERVER;

    $scope.mapOption = {
        title : {
            text: '',
            x:'center'
        },

        option:{
            backgroundColor : "#fff"
        },

        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x:'left',
            data:['家长','教师','家长&教师','未选角色']
        },
        dataRange: {
            min: 0,
            max: 1200,
            x: 'left',
            y: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
        },
        series : [
            {
                name: '家长',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data: []
            },
            {
                name: '教师',
                type: 'map',
                mapType: 'china',
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[]
            },
            {
                name: '家长&教师',
                type: 'map',
                mapType: 'china',
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[]
            },
            {
                name: '未选角色',
                type: 'map',
                mapType: 'china',
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[]
            }
        ]
    }
});
