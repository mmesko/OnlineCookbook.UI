(function (angular) {

    angular.module("onlineCookbook").service('authService',
        ['$http', '$q', '$window', 'BASE_CONSTS', function ($http, $q, $window, BASE_CONSTS) {

 
            return {

                logOut: function () {

                },

                // LOG IN, SIGN IN
                login: function (loginData) {
                    
                    console.log(loginData);
                    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                    return $http({
                        method: 'post',
                        url: BASE_CONSTS.BASE + "/token",
                        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: data
                    });
                },

                // REGISTER, SIGN UP
                saveRegistration: function (registration, password) {

                    return $http({
                        method: 'post',
                        url: BASE_CONSTS.BASE + "/api/user/register",
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