'use strict';

//应用初始化设置
//整体应用的配置
App
  .controller('AppCtrl', ['$scope', '$state','$translate', '$rootScope','$modal','$localStorage', '$window','toaster','SERVER','Util',"VERSION",
    function(    $scope, $state,$translate, $rootScope,$modal,$localStorage,$window,toaster,SERVER,Util,VERSION) {
      // add 'ie' classes to html
     var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');


        //当前登录系统
        $rootScope.currentSys = "";

        //加载本地用户
        $rootScope.user = Util.getLgObj("user");


        //token加入到运行中
        var accent_token = Util.getLg("accent_token");
        if(accent_token){
            $window.sessionStorage.token =  accent_token;
        }


        $rootScope.launchApp = function(role){
            $rootScope.currentSys  = role.sysCode;
        }


        //系统发生变更
        $rootScope.$watch("currentSys",function(data){

             if(data){
                 //存入local
                 Util.setSgObj("currentSys",data);
             }
        });


//        //全局提示框
        $rootScope.$watch("httpError",function(temp){

            if(temp){

                console.log(temp);

                var type = temp.type || "info";
                toaster.pop(type, temp.title, temp.content);

                if(temp.status == "403" || temp.status =="401"){
                    $state.go("auth.login");
                }
            }
        });


        $rootScope.alertSuccess = function(content,title){
            var title = title || "成功";

            var httpError = {
                content : content,
                title : title,
                status : 200,
                type : "success"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertInfo = function(content,title){
            var title = title || "提示";
            var httpError = {
                content : content,
                title : title,
                status : 200,
                type : "info"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertWarn = function(content,title){
            var title = title || "警告";
            var httpError = {
                content : content,
                title : title,
                status : 200,
                type : "warning"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertError = function(content,title){
            var title = title || "错误";
            var httpError = {
                content : content,
                title : title,
                status : 200,
                type : "danger"
            }
            $rootScope.httpError = httpError;
        }

        //跳转帮助页面
        $rootScope.openDoc = function(){
            $window.open("../cgular/src/index.html");
        }


        //弹窗
        $rootScope.alertModal = function(templateUrl,controllerName){
            var option = {};
            if(controllerName){
                option = {
                    templateUrl: templateUrl,
                    controller  : controllerName
                };
            }
            else{
                option = {
                    templateUrl: templateUrl
                };
            }
            var modalInstance = $modal.open(option);
            return modalInstance;
        }



        $rootScope.toggleNav = function(toggle){
            $scope.app.settings.asideFolded = toggle;
        }


      //应用设置参数
      $scope.app = {
        name: '云服务',
        version: VERSION.vs,
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 7,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-black',
          asideColor: 'bg-white b-r',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false,
          env      : false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }


        SERVER.url = SERVER.testUrl;

        //配置
        $rootScope.setting = {};


        //读出系统环境
        var temp;
        if(Util.getLg("env") == "1"){
            $rootScope.setting.env  = true;
        }
        else{
            $rootScope.setting.env  = false;
        }

        $rootScope.$watch("setting.env",function(newVal,oldVal){
            var msg = "";
            var num;
                //正式
                if(newVal){
                    SERVER.url = SERVER.formalUrl;
                    $rootScope.setting.msg = "正式环境";
                    num = 1;

                }
                //测试
                else{
                    SERVER.url = SERVER.testUrl;
                    $rootScope.setting.msg = "测试环境";
                    num = 0;
                }
                Util.setLg("env",num);
                $rootScope.alertSuccess("已经切换到"+  $rootScope.setting.msg);

        });


        $rootScope.isLogin = false;

        //路由状态变化
        $rootScope.$on("$stateChangeStart",function(event, toState, toParams,
                                                    fromState, fromParams) { });




      $scope.$watch('app.settings', function(newVal,oldVal){

        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;

       }


        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {
          en:'美帝',
          cn : "国语"
      };

      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "cn";


      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }


        //数组删除
        Array.prototype.remove = function (dx) {
            if (isNaN(dx) || dx > this.length) {
                return false;
            }
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i] != this[dx]) {
                    this[n++] = this[i];
                }
            }
            this.length -= 1;
        };



    }]);



