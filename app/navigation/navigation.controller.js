(function (angular) {


    angular.module("onlineCookbook").controller("NavigationController", ['$scope', '$window', '$controller', '$location','$rootScope',
    function ($scope, $window, $controller, $location, $rootScope) {

        $scope.showChilds = function (index) {
            $scope.menus[index].active = !$scope.menus[index].active;
            collapseAnother(index);
        };

        var collapseAnother = function (index) {
            for (var i = 0; i < $scope.menus.length; i++) {
                if (i != index) {
                    $scope.menus[i].active = false;
                }
            }
        };

        // Nav controller is first loaded controller and is alive all time 
        $location.path("#/");  

        var vm = $scope.vm = {};

        vm.loggedIn = false;
        vm.loggedOut = true;

        // global 
        $window.sessionStorage.user = "Log in";
        $window.sessionStorage.id = "";
        $window.sessionStorage.token = "";

        // Controllers 
        var modalRegisterController = $scope.$new();
        var modalLoginController = $scope.$new();

        $controller('ModalRegisterController', { $scope: modalRegisterController });
        $controller('ModalLoginController', { $scope: modalLoginController });

        // menu
        $scope.menus =
            [
                { name: "Home", link: "#/", active: "active" },
                { name: "Recipes", link: "#/recipe", active: "", submenus: [{name: 'Category', link: "#/category", active:""}]},
                { name: "Alergens", link: "#searchByAlergen", active: "" },
                { name: "Ingradients", link: "#/searchByIngradient", active: "" },
    
            ];

        // Right part of menu for unsigned user
        vm.user;
        vm.authRegister = { name: "Register" };
        vm.authUser = { name: "Login" };

        // Drop down menu items for signed user
        vm.account = { name: "Account", link: "#/account" };
        vm.logout = { name: "Logout", link: "#/" };


        // If button is pressed set it's class to active - used just for effect 
        vm.setActive = function (index) {
            clearActive();
            $scope.menus[index].active = "active";
        };

        // Opens register modal
        vm.registerClick = function () {
            modalRegisterController.open();
        };

        // Opens login modal
        vm.loginClick = function () {
            modalLoginController.open();
        };

        // Opens logout model
        vm.logoutClick = function () {
            $window.sessionStorage.user = "Log in";
            $window.sessionStorage.token = "";
            vm.user = "Log in";
            setMenuUser;
        };

        var clearActive = function () {

            for (var i = 0; i < $scope.menus.length; i++) {
                $scope.menus[i].active = "";
            }
        };

      
        var setMenuUser = function () {

            if ($window.sessionStorage.token.length > 0) {
                vm.loggedIn = true;
                vm.loggedOut = false;
                vm.user = $window.sessionStorage.user + " ";
            }
            else {
                vm.loggedIn = false;
                vm.loggedOut = true;
            }
        };

        // Keeps track on $window.sessionStorage.user changes            
        $scope.$watch(function () {
            return $window.sessionStorage.user;
        }, function (newVal, oldVal) {
            setMenuUser();
        });
    }
    ]);
})(angular);
