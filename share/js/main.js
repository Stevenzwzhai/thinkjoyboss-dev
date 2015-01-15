'use strict';

//应用初始化设置
//整体应用的配置
App
  .controller('AppCtrl', ['$scope', '$state','$translate', '$rootScope','$localStorage', '$window','toaster','SERVER',
    function(    $scope, $state,$translate, $rootScope,  $localStorage, $window ,toaster,SERVER) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      //应用设置参数
      $scope.app = {
        name: 'Boss',
        version: '1.3.3',
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
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
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



      $scope.$watch('app.settings', function(newVal,oldVal){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }


          //地址切换
          if(newVal.env !=  oldVal.env){
                var msg;
              //正式
              if(newVal.env){
                  SERVER.url = SERVER.formalUrl;
                  msg = "正式环境";
              }
              //测试
              else{
                  SERVER.url = SERVER.testUrl;
                  msg = "测试环境"
              }
              $rootScope.alertSuccess("已经切换到"+ msg);

            var stateName = $state.current.name;
            $state.go(stateName);
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



        //全局提示框
        $rootScope.$watch("httpError",function(temp){
            if(temp){
                var type = temp.type || "info";
                toaster.pop(type, temp.title, temp.content);
            }
        });


        $rootScope.alertSuccess = function(content,title){
            var title = title || "成功";

            var httpError = {
                content : content,
                title : "success",
                status : 200,
                type : "success"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertInfo = function(content){
            var httpError = {
                content : content,
                title : "info",
                status : 200,
                type : "info"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertWarn = function(content){
            var httpError = {
                content : content,
                title : "warning",
                status : 200,
                type : "warning"
            }
            $rootScope.httpError = httpError;
        }

        $rootScope.alertError = function(content){
            var httpError = {
                content : content,
                title : "error",
                status : 200,
                type : "danger"
            }
            $rootScope.httpError = httpError;
        }



    }]);