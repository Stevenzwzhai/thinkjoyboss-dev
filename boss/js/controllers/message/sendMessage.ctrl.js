/**
 * Created by shao on 15-1-22.
 */
App

    .controller("SendMessageCtrl", function ($rootScope, $scope, $state,  $q, $timeout, MessageService,AuditService,Util,UserService,UploadSev,SERVER) {

        console.log("SendMessageCtrl....");

        //发布对象类型
        $scope.sendUserTypes  = [
            {
                content : "班级",
                type  : "0"
            },
            {
                content  : "用户",
                type  : "1"
            }
        ];

        //form
        $scope.fm = {
             "userType" : "",
             receiversClass : "",
             receiversUser : "",
             schoolName : "",
             schoolId : "",
             content : "",
             imageList : []
        }


        $scope.isSubmit = false;

        $scope.isopen = false;

        //学校列表
        $scope.schools = [];
        $scope.classList =[];

        //查询学校
        $scope.searchSchool  = function(){
            if(!$scope.fm.schoolName){
                return;
            }
            var data = {
                pageIndex : 0,
                pageSize  :  10,
                schoolName    :  $scope.fm.schoolName
            }
            AuditService.getSchoolByName(data).then(function(res){
                var list = res.bizData.pageList;
                if(list.length > 0){
                    $scope.schools = res.bizData.pageList;
                    $scope.isopen = true;
                }
                else{
                    $rootScope.alertInfo("学校不存在!");
                    $scope.isopen = false;
                }
            },function(){

            });
        }

        //查询班级
        $scope.searchClass  = function(){
            if(!$scope.fm.schoolId){
                return;
            }
            var data = {
                style : "",
                data : {
                    pageIndex : 0,
                    pageSize  : 9999,
                    schoolId  : $scope.fm.schoolId
                },
                clientInfo  : {}
            }
            AuditService.getClassByName(data).then(function(res){
                $scope.classList = res.bizData.pageList;

            },function(){});
        }


        //上传图片
        $scope.uploadPic = function (files,$event,type) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var temp = files[i];
                    UploadSev.upload(temp).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        if(data.code == "200"){
                                $scope.fm.imageList.push(data.data.url);
                        }
                        else{
                            alert(data.code);
                        }
                    });
                }
            }
        };

        //发送消息
        $scope.sendMessage = function(){

            $scope.isSubmit = true;

            var content  =  $scope.fm.content;
            var imgList = $scope.fm.imageList;
            var receivers;

            console.log($scope.classList);


            //class
            if($scope.fm.userType == "0"){

                var temp = $scope.classList.filter(function(cs){
                    return cs.status == true;
                });
                temp = temp.map(function(cs){
                    return cs.classId;
                });

                receivers = {
                    "receiverClassIds": temp,
                    "receiverUserIds": []
                }

                var data = {
                    messageInfo : {
                        messageContent : content,
                        messagePics : imgList,
                        messageVoices : [],
                        messageSendTime : new Date().getTime(),
                        isSend : true
                    },
                    receivers : receivers
                }

                goMessage(data);
            }


            //user
            else if($scope.fm.userType == "1"){

                var promise = [];
                var users = $scope.fm.receiversUser.split(",");
                if(users.length <= 0 ){
                    return;
                }

                for(var i=0;i<users.length;i++){
                    var  u = users[i];
                    promise.push(UserService.getUserInfo(u));
                }


                $q.all(promise).then(function(res){
                    console.log(res);
                    var isFail = false;
                    var  userArray = [];
                    for(var j=0; j<res.length; j++){
                        var temp = res[j];
                        if(temp.rtnCode != "0000000"){
                            isFail = true;
                            break;
                        }
                        userArray.push(res[j].bizData.userInfo.userId+"-"+"0")
                    }

                    //联系获得userId
                    receivers = {
                        "receiverClassIds": [],
                        "receiverUserIds": userArray
                    }


                    var data = {
                        messageInfo : {
                            messageContent : content,
                            messagePics : imgList,
                            messageVoices : [],
                            messageSendTime : new Date().getTime(),
                            isSend : true
                        },
                        receivers : receivers
                    }


                    goMessage(data);


                },function(err){
                    $rootScope.alertError(err);
                });

            }



        }


        //goMessage
        var goMessage = function(data){
            MessageService.sendMessage(data).then(function(res){
                $scope.isSubmit = false;
                var msg = "发布成功";
                if(res.rtnCode != "0000000"){
                    msg = res.msg;
                }
                $rootScope.alertInfo(msg);


            },function(err){
                $scope.isSubmit = false;
            });

        }

        //选择学校
        $scope.selectSchool = function(sc){
            $scope.fm.schoolId = sc.schoolId;
            $scope.fm.schoolName = sc.schoolName;
            $scope.isopen = false;
            $scope.searchClass();
        }



    });
