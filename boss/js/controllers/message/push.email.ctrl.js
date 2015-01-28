/**
 * Created by shao on 15-1-27.
 */
App
    .controller("EmailMessagePushCtrl", ['$scope', function($scope) {

    }]);

App.controller('MailNewCtrl', ['$scope', '$interval', '$modal', function($scope, $interval, $modal) {
    $scope.mail = {
        to: '',
        subject: '',
        content: '',
        sender: '',
        password: '',
        timeSend: 1,
        date: "",
        showDate: new Date()
    };

    $scope.timeShow = false;
    $scope.showTime = function() {
        $scope.timeShow = !$scope.timeShow;
    }

    $interval(function() {
        if ($scope.mail.date == "")
        {
            $scope.mail.showDate = new Date();
        }
    }, 1000);

    $scope.$watch("mail.date", function(newdate){
        $scope.mail.showDate = newdate;
    });

    $scope.toggleTimeSend = function() {
        $scope.mail.timeSend = !$scope.mail.timeSend;
    }

    $scope.toggled = function(open) {

    };

    $scope.tolist = [
        {name: 'James', email:'james@gmail.com'},
        {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
        {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
    ];

    $scope.attachs = [];

    $scope.addAttach = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                attachs: function () {
                    return $scope.attachs;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.currentdate = "";

    $scope.sendMail = function() {
        alert($scope.currentdate);
    }
}]);

App.controller('ModalInstanceCtrl', function ($scope, $modalInstance, attachs) {

    $scope.attachs = attachs;
    $scope.newattach = "";
    $scope.addNewAttach = function() {
        if ($scope.newattach != "")
        {
            attachs.push($scope.newattach);
            $scope.newattach = "";
        }
    }

    $scope.remove = function(attach) {
        $scope.attachs.splice(0, 1);
    }

    $scope.ok = function () {
        $modalInstance.close();
    };
});
