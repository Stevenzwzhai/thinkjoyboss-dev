/**
 * Created by shao on 15-1-22.
 */
App

    .controller("ProductCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, Util, SERVER,CreditService) {

        console.log("ProductCtrl....");

        //商品列表地址
        $scope.productUrl = SERVER.url.credit + "/boss/getProductionList";

        //用户反馈列表
        $scope.posts = [];

        //刷新列表
        $scope.refresh = false;

        //参数
        $scope.params = {
            style : "",
            clientInfo : {},
            data : {
                queryTime : 0,
                token : $window.sessionStorage.token
            }
        };

        //addProduct
        $scope.addProduct = function(){
            $rootScope.alertModal("boss/tpl/market/product-add.html","ProductAddCtrl");
        }

        $scope.isSubmit = false;
    })

    .controller("ProductAddCtrl", function ($rootScope, $scope, UploadSev,CreditService,$http,Util,ConstantProductType) {

        console.log("add product....");

        $scope.productTypes = ConstantProductType;


        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.dt = new Date();

        $scope.dateOptions = {
            formatYear: 'yyyy-MM-dd',
            startingDay: 1,
            class: 'datepicker'
        };

        $scope.clear = function () {
            $scope.dt = null;
        };



        $scope.fm = {
            productionType : "",
            productionName : "",
            count : "",
            sortno : "",
            limitNumber : "",
            restrictType : "",
            startTime : "",
            endTime : "",
            smallImage  : "",
            mediumImage : "",
            bigImage   : "",
            comment : {
                productInfo : [],
                productImage : [],
                time : ""
            }
        }

        //上传图片
        $scope.uploadPic = function (files,$event,type) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var temp = files[i];
                    UploadSev.upload(temp).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        if(data.code == "200"){

                            if(type == "small"){
                                $scope.fm.smallImage = data.data.url;
                            }
                            else if(type== "medium"){
                                $scope.fm.mediumImage = data.data.url;
                            }
                            else if(type== "big"){
                                $scope.fm.bigImage = data.data.url;
                            }
                            else if(type == "info"){
                                $scope.fm.comment.productImage.push(data.data.url);
                            }
                        }
                        else{
                            alert(data.code);
                        }
                    });
                }
            }
        };


        //发布实物
        $scope.publishProduct = function(){

            //序列号comment
            $scope.fm.comment = JSON.stringify($scope.fm.comment);
            $scope.fm.startTime = new Date($scope.fm.startTime).getTime();
            $scope.fm.endTime = new Date($scope.fm.endTime).getTime();
            console.log($scope.fm);

            CreditService.addProduct($scope.fm)
                .success(function(res){
                    console.log(res);
                        $rootScope.alertInfo(res.msg);

            })
                .error(function(){
                    $rootScope.alertError("服务器错误!");
            });

        }



        $scope.reloadFile = "";
        $scope.hotLabel = false;


        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };


        var createTemp = function(){
            return {
                key : "",
                value : "",
                id : Util.uuid()
            }
        }

        //添加商品详情key value
        $scope.addObj= function(array){
            array.push(createTemp());
        }

        //删除
        $scope.removeObj = function(key,productInfo,array){
            for(var i =0; i<array.length;i++){
                var  object = array[i];
                if(object[key] == productInfo[key]){
                    array.remove(i);
                }
            }
        }

        //删除数组指定的字段

    });




App.service("ConstantProductType",function(){
    return [
        {
        "productTypeName" : "邮寄类",
        "productTypeId" : 1
        },
        {
            "productTypeName" : "自取",
            "productTypeId" : 2
        },
        {
            "productTypeName" : "电子卷",
            "productTypeId" : 3
        },
        {
            "productTypeName" : "虚拟话费",
            "productTypeId" : 4
        }
    ]
});

App.filter("productFilterStatus",function(){
    return function(status) {
        if(status == 0){
            return "(已上线)";
        }
        else if(status == -1){
            return "已下架";
        }
    };
})
