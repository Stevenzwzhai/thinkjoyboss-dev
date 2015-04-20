App.controller("UcmCtrl",function($rootScope,Promise){
    $rootScope.toggleNav(false);
    Promise.init("ucm","ucmRight","ucm");
    console.log("ucm ctrl...");

});