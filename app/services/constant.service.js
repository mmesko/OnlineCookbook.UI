(function (angular) {

    'use strict';
    angular.module('onlineCookbook').constant("routePrefix", {

       
        base: 'http://localhost:54167',
        alergen: 'http://localhost:54167/api/Alergen',
        ingradient: 'http://localhost:54167/api/Ingradient',
        category: 'http://localhost:54167/api/Category',
        recipe: 'http://localhost:54167/api/Recipe'
    });



})(angular)