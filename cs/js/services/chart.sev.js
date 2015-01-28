//chat service
App

    .factory("ChatSev", function ($q,SERVER) {


        var ChatSev = {

            socket : "",

            open : function(userName){
                    var defer = $q.defer();

                try{

                    if ('WebSocket' in window) {
                        ChatSev.socket = new WebSocket(SERVER.url.im);
                    } else if ('MozWebSocket' in window) {
                        ChatSev.socket = new MozWebSocket(SERVER.url.im);
                    }

                }catch(exception){
                    defer.reject("服务器链接失败!");
                }


                    ChatSev.socket.onopen = function(event) {
                        var option = {
                            type: "begin",
                            userName: userName
                        }

                        ChatSev.socket.send(JSON.stringify(option));
                        defer.resolve(event);
                    }


                return defer.promise;
            },

            //获得用户列表
            getUserList : function(username){
                var  option = {
                    type: "userList",
                    userName: username
                }
                ChatSev.socket.send(JSON.stringify(option));

            },

            //添加用户
            addUser  : function(username,cusNum,key){
                var  option = {
                    type: "accept",
                    userName: username,
                    to : cusNum,
                    key  : key
                }
                ChatSev.socket.send(JSON.stringify(option));
            },

            //发送消息
            sendMessage : function(username,cusNum,msg){
                var  option = {
                    type: "send",
                    userName: username,
                    to : cusNum,
                    msg  : msg
                }
                ChatSev.socket.send(JSON.stringify(option));
            }





        };

        return ChatSev;

    });