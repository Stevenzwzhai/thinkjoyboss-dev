//chat service
App

    .factory("ChatSev", function ($q,SERVER) {


        var ChatSev = {

            socket : "",
            open : function(userName){
                    var defer = $q.defer();

                if ('WebSocket' in window) {
                    ChatSev.socket = new WebSocket(SERVER.url.im);
                } else if ('MozWebSocket' in window) {
                    ChatSev.socket = new MozWebSocket(SERVER.url.im);
                }

                    ChatSev.socket.onopen = function(event) {
                        var option = {
                            type: "begin",
                            username: userName
                        }

                        ChatSev.socket.send(JSON.stringify(option));
                        defer.resolve(event);
                    }

                    ChatSev.socket.onerror = function(e){
                        console.log("ws error");
                        defer.reject(event);
                    }

                return defer.promise;
            },
            //获得用户列表
            getUserList : function(username){
                var  option = {
                    type: "userList",
                    username: username
                }
                ChatSev.socket.send(JSON.stringify(option));

            }



        };

        return ChatSev;

    });