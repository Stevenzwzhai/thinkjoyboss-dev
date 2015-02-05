App

    .factory("ClassService",function($http,$q,SERVER){

        return {


            getClassMessageInfoByCode : function(classCode,count){
                var defer =  $q.defer();
                $http.get(SERVER.url.uc+"/messageBoss/getClassMessages?classId=14100&count=10",{
                    params : {
                        classId : classCode,
                        count  : count
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