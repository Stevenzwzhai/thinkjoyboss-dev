App

    .factory("EmailService", function ($http, $q, SERVER) {

        return {


            //发送邮件
            sendEmail: function (mail) {
                var defer = $q.defer();
                console.log(angular.toJson(mail));
                $http.post(SERVER.url.push + "/email/send",
                    angular.toJson(mail), {headers:{'is-json-data': true}})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(data) {
                        defer.reject("邮件发送失败");
                    });

                return  defer.promise;
            }
        }
    });