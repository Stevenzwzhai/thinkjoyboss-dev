/**
 * Created by shao on 15-1-27.
 */
App
    .controller("EmailMessagePushCtrl", ['$scope', 'SERVER', function($scope, SERVER) {

    }]);

App.controller('MailNewCtrl', function($scope, $rootScope, $http, $interval, $modal, SERVER, EmailService) {
    $scope.mail = {
        receiverList: [],
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

    $scope.$watch("date", function(newdate){
        $scope.mail.sendDate = moment(newdate, "LLL").toDate().getTime();
    });


    $scope.toggleTimeSend = function() {
        $scope.mail.sendTimeType = $scope.mail.sendTimeType == 0 ? 1 : 0;
    }

    $scope.toggled = function(open) {

    };


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

    $scope.sendMail = function() {
        EmailService.sendEmail($scope.mail).then(function(data) {
                if (data.result == true)
                {
                    $rootScope.alertSuccess("邮件发送成功");
                }
                else
                {
                    $rootScope.alertError("邮件发送失败: " + data.msg);
                }

            }, function(err) {
                $rootScope.alertError("邮件发送失败" );
            });
    };
});

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
