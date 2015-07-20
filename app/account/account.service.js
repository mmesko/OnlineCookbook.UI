(function (angular) {

    angular.module("onlineCookbook").service("userService", [
        '$http', '$window', 'routePrefix',
        function ($http, $window, routePrefix) {

            return {
                getUserByUsername: function (username) {
                    return $http.get(routePrefix.base + "/" + username);
                },

                // Updates user username or email
                updateUser: function (user, password) {

                    var token = $window.sessionStorage.token;

                    return $http({
                        method: 'put',
                        url: routePrefix.base + "/UpdateUserOrMail",
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
                        url: routePrefix.base + "/UpdatePassword",
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