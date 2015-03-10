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
//        uc  : "http://10.10.68.11:8080/uc",
        uc  : "http://10.10.68.11:10000/uc",
//          uc  : "http://172.16.130.172:8088",
          message : "http://10.10.68.11:10000/message",
//          message : "http://10.10.68.12:8080/message",
            "ucm"  : "http://10.10.68.13:8080/ucm",
            //线上
            push : "http://121.41.61.218:8080/notify",
            im   : "ws://10.10.68.13:8080/notify/customerIM",
            sop  : "http://121.41.61.218:9003",
            mBridge : "http://172.16.130.204:8080/mBridge"
//        mBridge : "http://10.10.68.13:8081/mBridge"
    },
    //预发布
    formalUrl : {
        "ucm"  : "http://10.10.68.13:8080/ucm",
        uc  : "http://imzhiliao.com:10000/uc",
        message : "http://imzhiliao.com:10000/message",
        push : "http://121.41.61.218:8080/notify",
        im   : "ws://121.41.61.218:8080/notify/customerIM",
        sop  : "http://121.41.61.218:9003",
        mBridge : "http://10.10.68.13:8081/mBridge"
    }
});


App.constant("VERSION",{
    vs : "123"
});



App.run(function($rootScope,VERSION){
    $rootScope.VERSION = VERSION;
});