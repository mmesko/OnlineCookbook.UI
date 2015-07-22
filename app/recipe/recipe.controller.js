(function (angular) {

    'use strict';

    angular.module('onlineCookbook')
        .controller('RecipeController', ['recipeService', '$window', '$scope', '$location', 'categoryService',
    function (recipeService, $window, $scope, $location, categoryService) {

                var vm = $scope.vm = {};
                //var Id = $routeParams.Id;
                vm.searchString = "";
                vm.recipes = [];
                vm.recipe = null;
                vm.showTable = true;
                vm.pageNumber = 1;
                var pageSize = 5; // 5 alergens per page
                vm.selected = {};
                vm.showDetails = false;
                vm.showAddView = false;
                vm.showEditView = false;
                vm.newItem = {};
                vm.categoryId;
                vm.userId;


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
        
                vm.getItemDetails = function (item) {
                    vm.showTable = false;
                    vm.selected = item;
                    vm.showDetails = true;
                    
                   
                };

                vm.showEdit = function (item) {
                    vm.selected = {};
                    vm.selected = item;
                    vm.showDetails = false;
                    vm.showEditView = true;
                    vm.showAddView = false;
                };

               vm.showAdd = function () {
                   vm.showAddView = true;
                   vm.showEditView = false;
                   vm.showDetails = false;
                };

               vm.post = function (item) {
                   vm.showDetails = false;
                   vm.showEditView = false;
                   vm.showAddView = false;

                   recipeService.postRecipe(item)
                         .success(function (data) {
                             console.log(data);
                             console.log($window.alert("Added successfully!"));
                             vm.get();
                             vm.selected = {};
                         })
                         .error(function (data) {
                             console.log($window.alert("Cannot be added!"));
                             console.log(data); //error
                         });
               };

               vm.put = function (item) {
                  
                   vm.selected.RecipeTitle = item.RecipeTitle;
                   vm.selected.Abrv = item.Abrv;
                   vm.selected.RecipeComplexity = item.RecipeComplexity;
                   vm.selected.RecipeDescription = item.RecipeDescription;
                   vm.selected.RecipeText = item.RecipeText;
                   vm.selected.Id = item.Id;
                   vm.selected.CategoryId = item.CategoryId;
                   vm.selected.UserId = item.UserId;

                   recipeService.putRecipe(vm.selected)
                      .success(function (data) {
                          vm.selected = data;
                          console.log($window.alert("Recipe changed!"));
                          vm.showEdit();
                      })
                      .error(function (data) {

                          console.log($window.alert("Name already exist!"));
                          console.log(vm.selected);
                          console.log(data); // error 
                          vm.get();

                      });
               };
             
              

            }]);
})(angular);
