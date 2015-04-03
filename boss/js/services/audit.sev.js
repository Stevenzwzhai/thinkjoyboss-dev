//uc 对接

App

    .factory("AuditService", function ($http, $q, SERVER) {


       var Ajax = {

           //获得用户创建的班级
           getUserClass: function (data) {
               var defer = $q.defer();

               data.areaId = data.areaId || "";
               data.schoolId = data.schoolId || "";

               $http.get(SERVER.url.uc + "/school/getUserCustomClass", {
                   params: data
               })
                   .success(function (result) {
                       defer.resolve(result);
                   })
                   .error(function (err) {
                       console.error("class getList error");
                       defer.reject(err);
                   });

               return  defer.promise;
           },


           //获得用户创建的科目
           getUserSubject: function (data) {
               data.areaId = data.areaId || "";
               data.schoolId = data.schoolId || "";

               var defer = $q.defer();
               $http.get(SERVER.url.uc + "/school/getUserCustomSubject",{
                   params: data

               })
                   .success(function (result) {
                       defer.resolve(result);
                   })
                   .error(function (err) {
                       console.error("subject getList error");
                       defer.reject(err);
                   });


               return defer.promise;
           },
           //获得学校
           getSchool: function (data) {
               data.areaId = data.areaId || "";
               data.schoolId = data.schoolId || "";


               var defer = $q.defer();
               $http.get(SERVER.url.uc+"/school/getUserCustomSchool", {
                   params: data
               })
                   .success(function (res) {
                       defer.resolve(res);
                   })
                   .error(function (err) {
                       defer.reject(err);
                   });

               return defer.promise;
           },

           /**
            * 获得学校类型
            * @returns {promise|dd.g.promise|qFactory.Deferred.promise}
            */
           getSchoolTypes : function(){
               var defer =  $q.defer();
               $http.post(SERVER.url.uc+"/schoolBoss/getAllSchoolTypeNoToken",{})
                   .success(function(result){
                       defer.resolve(result);
                   })
                   .error(function(err){
                       defer.reject(err);
                   });
               return  defer.promise;
           },

           /**
            * 添加学校
            * @returns {promise|dd.g.promise|qFactory.Deferred.promise}
            */
           addSchool : function(schoolName,schoolTypeId,areaId,token){
               var defer =  $q.defer();
               $http.post(SERVER.url.uc+"/schoolBoss/addSchoolNoToken?token="+token,{
                   data: {
                       "schoolName": schoolName,
                       "schoolTypeId": schoolTypeId,
                       "areaId": areaId
                   }
               },{headers:{"is-json-data":1}})
                   .success(function(result){
                       defer.resolve(result);
                   })
                   .error(function(err){
                       defer.reject(err);
                   });
               return  defer.promise;
           },

           audit : function(id,type,status){
               var defer = $q.defer();
               $http.get(SERVER.url.uc + "/school/audit",{
                   params : {
                       userId : 0,
                       businessId : id,
                       businessType : type,
                       status   : status
                   }
               })
                   .success(function (res) {
                       defer.resolve(res);
                   })
                   .error(function (err) {
                       defer.reject(err);
                   });
               return defer.promise;
           },


           updateSchool : function(id,schoolName){
                   var defer = $q.defer();
                   $http.post(SERVER.url.uc+"/schoolBoss/updateSchoolInfo", {
                       schoolName: schoolName,
                       id  : id
                   })
                       .success(function (res) {
                           defer.resolve(res);
                       })
                       .error(function (err) {
                           defer.reject(err);
                       });

                   return defer.promise;
               }

       }

        return Ajax;

    });