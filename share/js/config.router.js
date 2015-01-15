'use strict';

/**
 * Config for the router
 */
App
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )



    .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/app/home');

          $stateProvider

              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'share/tpl/app.html'
              })

              //首页
              .state('app.home', {
                  url: '/home',
                  templateUrl: 'boss/tpl/home/home.html',
                  controller: "HomeCtrl as home"
              })

              //基础审核
              .state("app.audit",{
                  url : "/audit",
                  abstract : true,
                  templateUrl : "boss/tpl/audit/audit.html",
                  controller : "AuditCtrl"


              })

              //审核学校
              .state("app.audit.school",{
                  url : "/school",

                  "views" : {
                      "audit-school":{
                          templateUrl : "boss/tpl/audit/audio_school.html",
                          controller : "AuditSchoolCtrl"
                      }
                  }

              })

              //审核班级
              .state("app.audit.class",{
                  url : "/class",
                  "views" : {
                      "audit-class":{
                          templateUrl : "boss/tpl/audit/audio_class.html",
                          controller : "AuditClassCtrl"
                      }
                  }


              })

              //审核科目
              .state("app.audit.subject",{
                  url : "/subject",
                  "views" : {
                      "audit-subject":{
                          templateUrl : "boss/tpl/audit/audio_subject.html",
                          controller : "AuditSubjectCtrl"
                      }
                  }
              })


              .state("app.user", {
                  url: "/user",
                  templateUrl: "boss/tpl/user/userManager.html",
                  controller: "UserCtrl as test"
              })


      }
    ]
  );


//配置http 拦截器
App.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});
