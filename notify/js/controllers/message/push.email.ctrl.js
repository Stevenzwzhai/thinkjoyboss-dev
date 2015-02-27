/**
 * Created by shao on 15-1-27.
 */
App
    .controller("EmailMessagePushCtrl", ['$scope', 'SERVER', function($scope, SERVER) {

    }]);

App.controller('MailNewCtrl', function($scope, $localStorage, $rootScope, $http, $interval, $modal, SERVER, EmailService) {
    $scope.mail = {
        receiverList: [],
        attachList: [],
        ccList: [],
        emailProvider: "EP_126",
        subject: '',
        content: '',
        sender: '',
        password: '',
        username: "",
        useSsl: false,
        sendTimeType: 0,
        sendDate: new Date().getTime()
    };
    
    $scope.date = "";


    //本地保存用户使用的用户名和密码
    $scope.mail.sender = $localStorage.mail_sender;
    $scope.mail.password = $localStorage.mail_password;

    $scope.$watch("date", function(newdate){
        $scope.mail.sendDate = moment(newdate).toDate().getTime();
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

    $scope.sending = false;
    $scope.sendButton = "发送";
    $scope.setSendButton = function(status) {
        $scope.sending = status;
        $scope.sendButton = $scope.sending ? "发送邮件..."  : "发送" ;
    };
    $scope.resetSendStatus = function() {
        $scope.setSendButton(false);
        $scope.mail.attachList = [];
        $scope.mail.subject = "";
        $scope.mail.content = "";
    }

    $scope.sendMail = function() {
        if ($scope.mail.receiverList.isEmpty || $scope.mail.sender == "" || $scope.mail.password == ""
            || $scope.mail.subject == "") {
            $rootScope.alertWarn("请完成填写邮件信息" );
        } else {
            $scope.setSendButton(true);

            $scope.mail.username = $scope.mail.sender;
            $localStorage.mail_sender = $scope.mail.sender;
            $localStorage.mail_password = $scope.mail.password;
            EmailService.sendEmail($scope.mail).then(function(data) {
                if (data.result == true)
                {
                    $rootScope.alertSuccess("邮件发送成功");
                }
                else
                {
                    $rootScope.alertError("邮件发送失败: " + data.msg);
                }

                $scope.resetSendStatus();
            }, function(err) {
                $rootScope.alertError("邮件发送失败" );
            });
        }
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
