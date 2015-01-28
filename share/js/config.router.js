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



              //学校管理
              .state("app.school", {
                  url: "/school",
                  templateUrl: "boss/tpl/school/school.html",
                  controller: "SchoolCtrl"
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

              .state("app.sms", {
                  url: "/sms",
                  templateUrl: "boss/tpl/message/sms/smsQuery.html",
                  controller: "SMSCtrl"
              })

              .state("app.feedback", {
                  url: "/feedback",
                  templateUrl: "boss/tpl/message/feedback/feedbackQuery.html",
                  controller: "FeedbackCtrl"
              })

              .state("app.push", {
                  url: "/push",
                  views: {
                      "": {
                          templateUrl: "boss/tpl/message/push/messagePush.html",
                          controller: "MessagePushCtrl"
                      },
                      "email@app.push": {
                          templateUrl: "boss/tpl/message/push/email/email.html",
                          controller: "EmailMessagePushCtrl"
                      }
                  }
              })




             //sop 路由部分
              .state("app.sop", {
                  abstract: true,
                  url : "/sop",
                  templateUrl : "sop/tpl/sop.html"

              })

              //报表
              .state("app.sop.report", {
                  url : "/report",
                  templateUrl : "sop/tpl/report.html",
                  controller : "ReportCtrl"
              })
             //sop 路由部分




              //brige 路由部分

              //brige 路由部分

      }
    ]
  );


//配置http 拦截器
App.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});
