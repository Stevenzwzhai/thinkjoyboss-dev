App.controller("MyBridgeCtrl", function ($scope,$rootScope,Promise) {

    $rootScope.toggleNav(true);

    console.log("mybridge ctrl...");
    var newRight = Promise.init("mBridge", "bridgeRight", "mBridge");
    $scope.bridgeRight = newRight;



});