(function (angular) {

    angular.module("onlineCookbook").service("userService", [
        '$http', '$window', 'BASE_CONSTS',
        function ($http, $window, BASE_CONSTS) {

            return {
                getUserByUsername: function (username) {
                    return $http.get(BASE_CONSTS.BASE + "/" + username);
                },

                // Updates user username or email
                updateUser: function (user, password) {

                    var token = $window.sessionStorage.token;

                    return $http({
                        method: 'put',
                        url: BASE_CONSTS.BASE + "/UpdateUserOrMail",
                        headers: { 'Authorization': 'Bearer ' + token },
                        data: {
                            user: user,
                            password: password
                        }
                    });
                },

                updateUserPassword: function (userId, oldPassword, newPassword) {

                    var token = $window.sessionStorage.token;

                    return $http({
                        method: 'put',
                        url: BASE_CONSTS.BASE + "/UpdatePassword",
                        headers: { 'Authorization': 'Bearer ' + token },
                        data: {
                            userId: userId,
                            oldPassword: oldPassword,
                            newPassword: newPassword
                        }
                    })
                }
            };
        }]);

})(angular);