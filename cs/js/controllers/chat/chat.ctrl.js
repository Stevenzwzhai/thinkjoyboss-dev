App

    .controller("ChatCtrl", function ($rootScope,$scope, $window, $log, $q, $timeout, AuditService,Util,ChatSev) {

              //用户列表
             $scope.users = [];


            $scope.userName = "admin";
            $scope.userIcon = "lib/img/a0.jpg";

            //切换显示
            $scope.isToggle = true;

            //聊天列表
            $scope.posts = [];

            //当前激活的用户
            $scope.currentUser = {};

            //当前内容
            $scope.fm = {
                content : ""
            }


            function Message (body,icon,userId,userName){
                    this.body = body;
                    this.isReceive = false;
                    this.sendTime = new Date().getTime();
                    this.userIcon =  icon;
                    this.userId = userId;
                    this.userName = userName

            }




            //切换聊天
            $scope.toggleChat = function(toggle,user){

                if(toggle){
                    $scope.isToggle = true;
                    $scope.currentUser = "";
                }
                else{
                    $scope.isToggle = false;
                    $scope.currentUser = user || "";
                }

            }

            //发送
            $scope.enter = function(ev){
                if (ev.keyCode !== 13) return;
                console.log("发送...");
                var currentUser =   $scope.currentUser;
                var contnet = $scope.fm.content;
                if(contnet == ""){
                    $rootScope.alertInfo("写点什么啊！");
                    return;
                }


                var message =  angular.copy(new Message(contnet,$scope.userIcon,"01000",$scope.userName));

                if(!$scope.posts){
                    $scope.posts = [];
                }

                $scope.posts.push(message);

                var u = searchUser(currentUser.userId);


                if(!u.posts)
                    u.posts = [];

                u.posts.push(message);
                $rootScope.alertSuccess("消息已经发送!");
                ChatSev.sendMessage($scope.userName,currentUser.userId,contnet);

                //清空
                $scope.fm.content = "";

            }


        //显示聊天窗口
        $scope.showMessage = function(user){

            //新用户
            if(user.isNew){

                var isCon = window.confirm("用户 " + user.userName+" 咨询请求,是否接受？");

                if(isCon){
                    ChatSev.addUser($scope.userName,user.userId,user.key);
                }
                else{
                    removeUser(user.userId);
                }

            }
            else{
                $scope.posts =  user.posts;
                $scope.toggleChat(false,user);
//                $scope.$apply();
            }

        }



          //建立连接
          ChatSev.open($scope.userName).then(function(res){

              ChatSev.getUserList($scope.userName);
              ChatSev.socket.onmessage = onMessage;
          }).then(function(err){

          });




        //接受消息
        var  onMessage = function(event){
            var data = JSON.parse(event.data);
                switch (data.type){
                    case "broadcast" :  //获取广播到的新用户
                        data.userInfo.key = data.key;
                        $scope.users.push(data.userInfo);
                        break;
                    case "userList" :   //获取历史聊天用户列表
                        $scope.users =  data.userList;
                        break;
                    case "acceptResult" :   //验证结果
                        if(data.result){
                            $rootScope.alertSuccess("已接受此用户咨询！");
                        }
                        else{
                            $rootScope.alertError("已经有客服接受次用户!");
                            removeUser(data.to);
                        }

                        break;
                    case "receive" :   //接受消息
                        data.msg.isReceive = true;
                        var user = searchUser(data.msg.userId);
                        if(!user.posts)
                            user.posts = [];

                        //用户列表添加message
                        user.posts.push(data.msg);

                        console.log(data.msg);

                        if(!$scope.posts){
                            $scope.posts = [];
                        }

                        if(user.userId == $scope.currentUser.userId){
                            $scope.posts.push(data.msg);
                        }

                        break;

                    default :
                        break;

                }

            console.log(data.type);
                $scope.$apply();
        }



        //删除列表用户
        var removeUser = function(userId){
            $scope.users.forEach(function(user,index){
                if(user.userId == userId)
                    $scope.users.splice(index,1);
            });
        }


        //查找到用户列表
        var  searchUser = function(userId){
            for(var i=0;i<$scope.users.length;i++){
                var u = $scope.users[i];
                if(u.userId == userId){
                    return  u;
                }
            }
        }




    });



