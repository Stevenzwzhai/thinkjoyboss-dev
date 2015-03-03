App.controller("MyBridgeCtrl", function ($scope, Promise) {

    console.log("mybridge ctrl...");
    var newRight = Promise.init("mBridge", "bridgeRight", "mBridge");
    $scope.bridgeRight = newRight;


});