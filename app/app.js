﻿
(function (angular) {

    var app = angular.module("onlineCookbook", ["ngRoute", 'ui.bootstrap', 'cookbookFilters']);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: "app/welcomeView.html"
                })
                 .when('/searchByAlergen', {
                     templateUrl: 'app/alergen/alergen.html',
                     controller: "AlergenController",
                     controllerAs: 'al'
 
                 })
                .when('/searchByIngradient', {
                    templateUrl: 'app/ingradient/ingradient.html',
                    controller: 'IngradientController',
                    controllerAs: 'ig'
                })              
                .when('/category', {
                    templateUrl: 'app/category/category.html',
                    controller: 'CategoryController',
                    controllerAs: 'ct'
                })
                .when('/account', {
                    templateUrl: 'app/account/account.html',
                    controller: 'AccountController',
                    controllerAs: 'vm'
                })
               
                .otherwise({
                    redirectTo: '/'
                })
        }]);


})(angular);