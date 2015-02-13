App

    .factory("ClassService",function($http,$q,SERVER){

        return {


            getClassMessageInfoByCode : function(classCode,userType,count,queryTime){
                var defer =  $q.defer();
                $http.get(SERVER.url.message+"/messageBoss/getClassMessages",{
                    params : {
                        classId : classCode,
                        count  : count,
                        userType : userType,
                        queryTime : queryTime
                    }
                })
                 .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        console.error("class error");
                        defer.reject(err);
                  });
                return  defer.promise;
            },


            getClassInfo : function(classCode){
                var defer =  $q.defer();
                $http.get(SERVER.url.uc+"/schoolBoss/classInfo",{
                    params : {
                        classCode : classCode
                    }
                })
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        console.error("class error");
                        defer.reject(err);
                    });
                return  defer.promise;
            }

        }


    });