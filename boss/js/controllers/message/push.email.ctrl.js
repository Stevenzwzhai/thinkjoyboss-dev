/**
 * Created by shao on 15-1-27.
 */
App
    .controller("EmailMessagePushCtrl", ['$scope', 'SERVER', function($scope, SERVER) {

    }]);

App.controller('MailNewCtrl', ['$scope', '$rootScope', '$http', '$interval', '$modal', 'SERVER', function($scope, $rootScope, $http, $interval, $modal, SERVER) {
    $scope.mail = {
        receiverList: ["fshao@thinkjoy.cn"],
        attachList: [],
        ccList: [],
        emailProvider: "EP_126",
        subject: '测试标题',
        content: '测试内容',
        sender: 'ishaofeng@126.com',
        password: 'shaofeng5000',
        username: "ishaofeng@126.com",
        useSsl: false,
        sendTimeType: 0,
        sendDate: new Date()
    };
    
    $scope.date = "";

    $scope.timeShow = false;
    $scope.showTime = function() {
        $scope.timeShow = !$scope.timeShow;
    }

    $interval(function() {
        if ($scope.mail.date == "")
        {
            $scope.mail.sendDate = new Date();
        }
    }, 1000);

    $scope.$watch("mail.date", function(newdate){
        $scope.mail.sendDate = newdate;
    });

    $scope.toggleTimeSend = function() {
        $scope.mail.sendTimeType = $scope.mail.sendTimeType == 0 ? 1 : 0;
    }

    $scope.toggled = function(open) {

    };

    $scope.tolist = [
        {name: 'James', email:'james@gmail.com'},
        {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
        {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
    ];

    $scope.addAttach = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                attachs: function () {
                    return $scope.mail.attachList;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.currentdate = "";

    $scope.url = SERVER.url.push + "/email/send";

    $scope.sendMail = function() {
        console.log(angular.toJson($scope.mail));
        $http.post($scope.url, $scope.mail, {headers:{'is-json-data': true}})
            .success(function(data) {
                if (data.result == true)
                {
                    $rootScope.alertSuccess("邮件发送成功");
                }
                else
                {
                    $rootScope.alertError("邮件发送失败: " + data.msg);
                }

            })
            .error(function(data) {
                $rootScope.alertError("邮件发送失败" )
            })
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
