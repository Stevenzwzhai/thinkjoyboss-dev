// config

App
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])

  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.json'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('cn');

    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);




//常量配置
App.constant("SERVER", {
    url : {
        uc  : "",
        message : "",
        push : "",
        sop  : ""
    },
    //测试
    testUrl : {
        uc  : "http://10.10.68.11:8080/v1",
        message : "http://10.10.68.12:8080/v1",

        //线上
       // push : "http://115.29.184.78:8084/push",
        push: "http://127.0.0.1:8080",

//        push : "http://172.16.130.27:8080/push",
//        im   : "ws://172.16.130.27:8080/push/customerIM",
        im   : "ws://115.29.184.78:8084/push/customerIM",
        sop  : "http://121.41.61.218:9003"
    },
//    //测试
//    testUrl : {
//        uc  : "http://172.16.130.34:8080/v1",
//        message : "http://172.16.130.34:8080/v1"
//    },
//    //正式
//    formalUrl : {
//        uc  : "http://imzhiliao.com:10012/v1",
//        message : "http://imzhiliao.com:10011/v1"
//    }

    //预发布
    formalUrl : {
        uc  : "http://imzhiliao.com:10000/uc",
        message : "http://imzhiliao.com:10000/message",
        push : "http://115.29.184.78:8084/push",
        im   : "ws://115.29.184.78:8084/push/customerIM",
        sop  : "http://121.41.61.218:9003"
    }
});