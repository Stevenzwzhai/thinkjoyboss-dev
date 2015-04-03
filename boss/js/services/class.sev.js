App

    .factory("ClassService",function($http,$resource,$q,SERVER){

        return {



            getClassMessageInfoByCode : function(classCode,userType,count,queryTime){
                var defer =  $q.defer();
               $http.post(SERVER.url.message+"/messageBoss/getClassMessages",
                   {
                       data:{
                           classId : classCode,
                           count  : count,
                           userType : userType,
                           queryTime : queryTime
                       }
                   },{headers : {"is-json-data":1}})
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
                $http.post(SERVER.url.uc+"/schoolBoss/classInfo",{
                    data : {
                        classCode : classCode
                    }
                },{headers : {"is-json-data":1}})
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