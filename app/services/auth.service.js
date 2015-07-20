(function (angular) {

    angular.module("onlineCookbook").service('authService',
        ['$http', '$q', '$window', "routePrefix", function ($http, $q, $window, routePrefix) {

 
            return {

                logOut: function () {

                },

                // LOG IN, SIGN IN
                login: function (loginData) {
                    
                    console.log(loginData);
                    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                    return $http({
                        method: 'post',
                        url: routePrefix.base + "/token",
                        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: data
                    });
                },

                // REGISTER, SIGN UP
                saveRegistration: function (registration, password) {

                    return $http({
                        method: 'post',
                        url: routePrefix.base + "/api/user/register",
                        header: { 'Content-Type': 'application/json' },
                        data: {
                            user: registration,
                            password: password
                        }
                    })

                }
            };

        }]);

})(angular)