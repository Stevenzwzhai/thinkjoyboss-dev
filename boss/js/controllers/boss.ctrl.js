App.controller("BossCtrl",function($rootScope,Promise){
    $rootScope.toggleNav(false);
    Promise.init("boss","bossRight","boss");
    console.log("boss ctrl...");

});