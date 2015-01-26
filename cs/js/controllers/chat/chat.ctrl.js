App

    .controller("ChatCtrl", function ($rootScope,$scope, $window, $log, $q, $timeout, AuditService,Util,ChatSev) {

            console.log("chat...");

            $scope.userName = "admin";

            //切换显示
            $scope.isToggle = true;

            //发送消息
            $scope.sendVal = "";

            //聊天列表
            $scope.posts = [
                {
                    msgBody : "你好的我是小明...",
                    msgTime  : "10:12",
                    username  : "小明",
                    msgImg    : "lib/img/a0.jpg",
                    msgFrom   : "1"
                },
                {
                    msgBody : "你好的我是小明...",
                    msgTime  : "10:12",
                    username  : "小明",
                    msgImg    : "lib/img/a0.jpg",
                    msgFrom   : "2"
                },
                {
                    msgBody : "你好的我是小明...",
                    msgTime  : "10:12",
                    username  : "小明",
                    msgImg    : "lib/img/a0.jpg",
                    msgFrom   : "3"
                }
            ];

            //用户列表
            $scope.userList = [];

            //切换聊天
            $scope.toggleChat = function(toggle){

                if(toggle){
                    $scope.isToggle = true;

                }
                else{
                    $scope.isToggle = false;
                }

            }

            //发送
            $scope.enter = function(ev){
                if (ev.keyCode !== 13) return;
                console.log("发送...");
                $scope.sendVal = "";
                //清空
            }

            //接受消息
            var  onMessage = function(event){
                var data = JSON.parse(event.data);
                switch (data.type){
                    case "broadcast" :  //获取广播到的新用户
                        $scope.userList.unshift(data.userInfo);
                        console.log($scope.userList);
                        break;
                    case "userList" :   //获取历史聊天用户列表

                        break;
                    default :
                        break;
                }


            }


          //建立连接
          ChatSev.open($scope.userName).then(function(res){
              ChatSev.getUserList($scope.userName);
              ChatSev.socket.onmessage = onMessage;
          }).then(function(err){

          });





    });