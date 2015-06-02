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
      function ($stateProvider,   $urlRouterProvider,VERSION) {


          $stateProvider

              .state('launch', {
                  url: '/launch',
                  templateUrl: 'auth/tpl/launch.html?v='+VERSION.vs,
                  controller: "LaunchCtrl"
              })

              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'share/tpl/app.html?v='+VERSION.vs
               })

              //boss 部分...............
              .state('app.boss', {
                  abstract: true,
                  url: '/boss',
                  templateUrl: 'boss/tpl/boss.html?v='+VERSION.vs,
                  controller: "BossCtrl"
              })

              //首页
              .state('app.boss.home', {
                  url: '/home',
                  templateUrl: 'boss/tpl/home/home.html?v='+VERSION.vs,
                  controller: "HomeCtrl as home"
              })

              //学校管理
              .state("app.boss.school", {
                  url: "/school",
                  templateUrl: 'boss/tpl/school/school.html?v='+VERSION.vs,
                  controller: "SchoolCtrl"
              })
              //基础审核
              .state("app.boss.audit",{
                  url : "/audit",
                  abstract : true,
                  templateUrl : 'boss/tpl/audit/audit.html?v='+VERSION.vs,
                  controller : "AuditCtrl"


              })
              //审核学校
              .state("app.boss.audit.school",{
                  url : "/school",

                  "views" : {
                      "audit-school":{
                          templateUrl : "boss/tpl/audit/audio_school.html?v="+VERSION.vs,
                          controller : "AuditSchoolCtrl"
                      }
                  }
              })
              //审核班级
              .state("app.boss.audit.class",{
                  url : "/class",
                  "views" : {
                      "audit-class":{
                          templateUrl : "boss/tpl/audit/audio_class.html?v="+VERSION.vs,
                          controller : "AuditClassCtrl"
                      }
                  }
              })
              //审核科目
              .state("app.boss.audit.subject",{
                  url : "/subject",
                  "views" : {
                      "audit-subject":{
                          templateUrl : "boss/tpl/audit/audio_subject.html?v="+VERSION.vs,
                          controller : "AuditSubjectCtrl"
                      }
                  }
              })

              //学校下班级查询
              .state("app.boss.schoolClass", {
                  url: "/schoolClass/:schoolId",
                  templateUrl: 'boss/tpl/school/school-class.html?v='+VERSION.vs,
                  controller: "SchoolClassCtrl"
              })


              //班级管理
              .state("app.boss.class",{
                  url : "/class/:classId/:schoolId",
                  templateUrl : "boss/tpl/class/class.html?v="+VERSION.vs,
                  controller : "ClassCtrl"

              })
              .state("app.boss.user", {
                  url: "/user/:phone",
                  templateUrl: "boss/tpl/user/userManager.html?v="+VERSION.vs,
                  controller: "UserCtrl as test"
              })

              .state("app.boss.message", {
                  url: "/message",
                  abstract : true
              })

              .state("app.boss.message.sendMsg", {
                  url: "/sendMsg",
                  views : {
                      "@app.boss" : {
                          templateUrl : "boss/tpl/message/send/sendMessage.html?v="+VERSION.vs,
                          controller: "SendMessageCtrl"

                      }
                  }
              })


              .state('app.boss.market', {
                  url:"/market",
                  templateUrl : "boss/tpl/market/market.html?v="+VERSION.vs
              })

              //查询兑换记录
              .state('app.boss.market.credit', {
                  url:"/credit/:phone",
                  templateUrl: "boss/tpl/market/credit.html?v="+VERSION.vs,
                  controller: "CreditCtrl"
              })

              //查询商品列表
              .state('app.boss.market.product', {
                  url:"/product",
                  templateUrl: "boss/tpl/market/product-list.html?v="+VERSION.vs,
                  controller: "ProductCtrl"
              })


              //boss 部分...............



              //notfiy 部分...............
              .state("app.notify",{
                  abstract: true,
                  url: '/notify',
                  templateUrl: 'notify/tpl/notify.html?v='+VERSION.vs,
                  controller: "NotifyCtrl"


              })
              .state("app.notify.sms", {
                  url: "/sms",
                  templateUrl: "notify/tpl/message/sms/smsQuery.html?v="+VERSION.vs,
                  controller: "SMSCtrl"
              })

              .state("app.notify.smschannel", {
                  url: "/smsChannel",
                  templateUrl: "notify/tpl/message/sms/smsChannel.html?v="+VERSION.vs,
                  controller: "SMSChannelCtrl"
              })
              .state("app.notify.feedback", {
                  url: "/feedback",
                  templateUrl: "notify/tpl/message/feedback/feedbackQuery.html?v="+VERSION.vs,
                  controller: "FeedbackCtrl"
              })
              .state("app.notify.push", {
                  url: "/push",
                  views: {
                      "": {
                          templateUrl: "notify/tpl/message/push/messagePush.html?v="+VERSION.vs,
                          controller: "MessagePushCtrl"
                      },
                      "email@app.push": {
                          templateUrl: "notify/tpl/message/push/email/email.html?v="+VERSION.vs,
                          controller: "EmailMessagePushCtrl"
                      }
                  }
              })


              //notfiy 部分...............
              .state("app.notify.emailSetting", {
                  url: "/emailSetting",
                  templateUrl: "notify/tpl/message/email/email.html?v="+VERSION.vs
              })



              //setting 部分...............

              //设置页面
              .state('app.set', {
                  url: '/setting',
                  templateUrl: 'share/tpl/settings-page.html?v='+VERSION.vs
              })
              //setting 部分...............



             //sop 路由部分
              .state("app.sop", {
                  abstract: true,
                  url : "/sop",
                  templateUrl : "sop/tpl/sop.html?v="+VERSION.vs,
                  controller: "SopCtrl"

              })
              //地域分布图
              .state("app.sop.userMap", {
                  url : "/userMap",
                  templateUrl : "sop/tpl/userMap.html?v="+VERSION.vs,
                  controller : "userMapCtrl"
              })
              //7日趋势图
              .state("app.sop.7Trend", {
                  url : "/7Trend",
                  templateUrl : "sop/tpl/7Trend.html?v="+VERSION.vs,
                  controller : "7TrendCtrl"
              })
              //报表
              .state("app.sop.report", {
                  url : "/report",
                  templateUrl : "sop/tpl/report.html?v="+VERSION.vs,
                  controller : "ReportCtrl"
              })
             //sop 路由部分



              //bridge 路由部分

              .state("app.mbridge",{
                  url : "/mbridge",
                  abstract : true,
                  templateUrl : "bridge/tpl/mbridge.html?v="+VERSION.vs,
                  controller : "MyBridgeCtrl"
              })

              .state("app.mbridge.bridge", {
                  url : "/bridge",
                  templateUrl : "bridge/tpl/bridge.html?v="+VERSION.vs,
                  controller : "BridgeCtrl"
              })

              .state("app.mbridge.setting", {
                  url : "/setting",
                  templateUrl : "bridge/tpl/bridge-setting.html?v="+VERSION.vs,
                  abstract : true,
                  controller : "BridgeSettingCtrl"

              })


              .state("app.mbridge.setting.filed", {
                  url : "/filed",
                  templateUrl : "bridge/tpl/bridge-setting-filed.html?v="+VERSION.vs,
                  controller : "BridgeSettingMessageCtrl"

              })

              .state("app.mbridge.setting.poto", {
                  url : "/poto",
                  templateUrl : "bridge/tpl/bridge-setting-poto.html?v="+VERSION.vs,
                  controller : "BridgeSettingPotoCtrl"
              })

              .state("app.mbridge.setting.system", {
                  url : "/system",
                  templateUrl : "bridge/tpl/bridge-setting-system.html?v="+VERSION.vs,
                  controller : "BridgeSettingSystemCtrl"
              })
              //bridge 路由部分



              // ucm
              .state("app.ucm", {
                  url : "/ucm",
                  abstract : true,
                  templateUrl : "ucm/tpl/ucm.html",
                  controller : "UcmCtrl"
              })

              //系统资源配置
              .state("app.ucm.systemResSetting", {
                  url : "/systemResSetting",
                  templateUrl : "ucm/tpl/systemResSetting.html?v="+VERSION.vs,
                  controller : "SystemResSettingCtrl"
              })


            //login
              .state("auth", {
                  url : "/auth",
                  abstract : true,
                  templateUrl : "auth/tpl/auth.html?v="+VERSION.vs
              })

              .state("auth.login", {
                  url : "/login",
                  templateUrl : "auth/tpl/signin.html?v="+VERSION.vs
              })

              .state("auth.setting", {
                  url : "/login",
                  templateUrl : "auth/tpl/signin.html?v="+VERSION.vs
              });


          //login
          $urlRouterProvider.otherwise('/auth/login');



      }
  );




//配置http 拦截器
App.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});
