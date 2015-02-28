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


          $stateProvider

              .state('launch', {
                  url: '/launch',
                  templateUrl: 'auth/tpl/launch.html?v=113',
                  controller: "LaunchCtrl"
              })


              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'share/tpl/app.html?v=113'
               })



              //boss 部分...............
              .state('app.boss', {
                  abstract: true,
                  url: '/boss',
                  templateUrl: 'boss/tpl/boss.html?v=113',
                  controller: "BossCtrl"
              })

              //首页
              .state('app.boss.home', {
                  url: '/home',
                  templateUrl: 'boss/tpl/home/home.html?v=113',
                  controller: "HomeCtrl as home"
              })

              //学校管理
              .state("app.boss.school", {
                  url: "/school",
                  templateUrl: "boss/tpl/school/school.html?v=113",
                  controller: "SchoolCtrl"
              })
              //基础审核
              .state("app.boss.audit",{
                  url : "/audit",
                  abstract : true,
                  templateUrl : "boss/tpl/audit/audit.html?v=113",
                  controller : "AuditCtrl"


              })
              //审核学校
              .state("app.boss.audit.school",{
                  url : "/school",

                  "views" : {
                      "audit-school":{
                          templateUrl : "boss/tpl/audit/audio_school.html?v=113",
                          controller : "AuditSchoolCtrl"
                      }
                  }

              })
              //审核班级
              .state("app.boss.audit.class",{
                  url : "/class",
                  "views" : {
                      "audit-class":{
                          templateUrl : "boss/tpl/audit/audio_class.html?v=113",
                          controller : "AuditClassCtrl"
                      }
                  }


              })
              //审核科目
              .state("app.boss.audit.subject",{
                  url : "/subject",
                  "views" : {
                      "audit-subject":{
                          templateUrl : "boss/tpl/audit/audio_subject.html?v=113",
                          controller : "AuditSubjectCtrl"
                      }
                  }
              })
              //班级管理
              .state("app.boss.class",{
                  url : "/class",
                  templateUrl : "boss/tpl/class/class.html?v=113",
                  controller : "ClassCtrl"

              })
              .state("app.boss.user", {
                  url: "/user",
                  templateUrl: "boss/tpl/user/userManager.html?v=113",
                  controller: "UserCtrl as test"
              })
              //boss 部分...............



              //notfiy 部分...............
              .state("app.notify",{
                  abstract: true,
                  url: '/notify',
                  templateUrl: 'notify/tpl/notify.html?v=113',
                  controller: "NotifyCtrl"


              })
              .state("app.notify.sms", {
                  url: "/sms",
                  templateUrl: "notify/tpl/message/sms/smsQuery.html?v=113",
                  controller: "SMSCtrl"
              })

              .state("app.notify.smschannel", {
                  url: "/smsChannel",
                  templateUrl: "notify/tpl/message/sms/smsChannel.html?v=113",
                  controller: "SMSChannelCtrl"
              })
              .state("app.notify.feedback", {
                  url: "/feedback",
                  templateUrl: "notify/tpl/message/feedback/feedbackQuery.html?v=113",
                  controller: "FeedbackCtrl"
              })
              .state("app.notify.push", {
                  url: "/push",
                  views: {
                      "": {
                          templateUrl: "notify/tpl/message/push/messagePush.html?v=113",
                          controller: "MessagePushCtrl"
                      },
                      "email@app.push": {
                          templateUrl: "notify/tpl/message/push/email/email.html?v=113",
                          controller: "EmailMessagePushCtrl"
                      }
                  }
              })


              //notfiy 部分...............




              //setting 部分...............

              //设置页面
              .state('app.set', {
                  url: '/setting',
                  templateUrl: 'share/tpl/settings-page.html?v=113'
              })
              //setting 部分...............



             //sop 路由部分
              .state("app.sop", {
                  abstract: true,
                  url : "/sop",
                  templateUrl : "sop/tpl/sop.html?v=113",
                  controller: "SopCtrl"

              })
              //地域分布图
              .state("app.sop.userMap", {
                  url : "/userMap",
                  templateUrl : "sop/tpl/userMap.html?v=113",
                  controller : "userMapCtrl"
              })
              //7日趋势图
              .state("app.sop.7Trend", {
                  url : "/7Trend",
                  templateUrl : "sop/tpl/7Trend.html?v=113",
                  controller : "7TrendCtrl"
              })
              //报表
              .state("app.sop.report", {
                  url : "/report",
                  templateUrl : "sop/tpl/report.html?v=113",
                  controller : "ReportCtrl"
              })
             //sop 路由部分



              //bridge 路由部分

              .state("app.mbridge",{
                  url : "/mbridge",
                  abstract : true,
                  templateUrl : "bridge/tpl/mbridge.html?v=113",
                  controller : "MyBridgeCtrl"
              })

              .state("app.mbridge.bridge", {
                  url : "/bridge",
                  templateUrl : "bridge/tpl/bridge.html?v=113",
                  controller : "BridgeCtrl"
              })

              .state("app.mbridge.setting", {
                  url : "/setting",
                  templateUrl : "bridge/tpl/bridge-setting.html?v=113",
                  abstract : true,
                  controller : "BridgeSettingCtrl"

              })


              .state("app.mbridge.setting.filed", {
                  url : "/filed",
                  templateUrl : "bridge/tpl/bridge-setting-filed.html?v=113",
                  controller : "BridgeSettingMessageCtrl"

              })

              .state("app.mbridge.setting.poto", {
                  url : "/poto",
                  templateUrl : "bridge/tpl/bridge-setting-poto.html?v=113",
                  controller : "BridgeSettingPotoCtrl"
              })


              //bridge 路由部分

            //login
              .state("auth", {
                  url : "/auth",
                  abstract : true,
                  templateUrl : "auth/tpl/auth.html?v=113"
              })

              .state("auth.login", {
                  url : "/login",
                  templateUrl : "auth/tpl/signin.html?v=113"
              })

              .state("auth.setting", {
                  url : "/login",
                  templateUrl : "auth/tpl/signin.html?v=113"
              });


            //login

          $urlRouterProvider.otherwise('/auth/login');



      }
    ]
  );




//配置http 拦截器
App.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});
