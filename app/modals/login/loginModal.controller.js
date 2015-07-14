(function (angular) {

	angular.module("onlineCookbook").controller("ModalLoginController", ['$scope', '$window', '$modal', '$log', 'authService',
        function ($scope, $window, $modal,$log, authService) {

            var vm = $scope.vm = {};

            vm.user = { userName: null, password: null };

            // when opening modal
            $scope.open = function () {

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'app/modals/login/login.html',
                    controller: 'OpenLoginModalCtrl',
                    windowClass: 'modal-style',
                    backdrop: true,
                    resolve: {
                        injectUserInfo: function () {
                            return vm.user;
                        }
                    }
                });

                // Called after closing modal
                modalInstance.result.then(function (userToLogin) {

                    login(userToLogin);

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            // PRIVATE
            // used to log in user
            var login = function (user) {
                console.log(user);
                authService.login(user).success(function (data, status, header, config) {
                    console.log(data);
                    $window.sessionStorage.user = data.username;
                    $window.sessionStorage.token = data.access_token;
                    $window.sessionStorage.id = data.id;

                }).error(function (data, status, header, config) {
                    alert(data.error + " : " + data.error_description);
                });
            }
    }]);

})(angular);



// Used when modal is created 
(function (angular) {

	angular.module("onlineCookbook").controller("OpenLoginModalCtrl",
        ['$scope', '$modalInstance', 'injectUserInfo',
        function ($scope, $modalInstance, injectUserInfo) {

            var vm = $scope.vm = {};
            $scope.userInfo = injectUserInfo;

            // For cancel button
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            // User login
            $scope.userLogin = function (user) {
                $modalInstance.close(user);
            };

        }]);


})(angular);