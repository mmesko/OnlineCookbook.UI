(function (angular) {

    'use strict';

    angular.module('onlineCookbook')
        .controller('RecipeController', ['recipeService', '$window', '$scope','$location',
    function (recipeService, $window, $scope,$location) {

                var vm = $scope.vm = {};

                vm.searchString = "";
                vm.recipes = [];
                vm.recipe = null;
                vm.showTable = true;
                vm.pageNumber = 1;
                var pageSize = 5; // 5 alergens per page


                vm.get = function () {

                    if (vm.searchString.length > 0) {

                        recpeService.getRecipesByName(vm.searchString).success(function (data) {
                            console.log(data);
                            vm.recipes = data;
                        }).error(function (error) {
                            console.log('Unable to get alergen: ' + error.message);
                        });
                    }
                    else {
                        //inace mi dohvati sve
                        recipeService.getRecipes(vm.pageNumber, pageSize).success(function (data) {
                            vm.recipes = data;
                        }).error(function (error) {
                            console.log('Unable to get alergen: ' + error.message);
                        });
                    }

                };
        
                vm.goToRecipe = function (recipe) {
                    $location.path('/recipe/recipeView.html' + recipe.Id);
                    vm.recipes = recipe;
              
                }
                 
             
              

            }]);
})(angular);
