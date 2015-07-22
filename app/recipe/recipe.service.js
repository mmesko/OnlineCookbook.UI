(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service('recipeService', ['$http', 'routePrefix', '$window',
        function ($http, routePrefix, $window) {



            return {

                // Get alergen by name
                getRecipesByName: function (name) {
                    return $http.get(routePrefix.recipe + "/getByName/" + name);
                },

                getRecipesByCategory: function (categoryId, pageNumber, pageSize) {
                    return $http.get(routePrefix.recipe + "/" + categoryId + "/" + pageNumber + "/" + pageSize);
                },

                // Get alergens
                getRecipes: function (pageNumber, pageSize) {
                    console.log('dsaff');
                    return $http.get(routePrefix.recipe + "/" + pageNumber + "/" + pageSize);
                },

                postRecipe: function (data) {

                    var token = $window.localStorage.token;

                    return $http({

                        method: 'post',
                        url: routePrefix.recipe + "/",
                        headers: {'Authorization': 'Bearer ' + token},
                        data: $.param(data)

                    })
                },

                putRecipe: function (data) {

                   

                    return $http({

                        method: 'put',
                        url: routePrefix.recipe + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                // delete from db
                deleteRecipe: function (id) {
                    console.log($.param(id));
                    return $http({
                        method: 'delete',
                        url: routePrefix.recipe + "/" + id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(id)

                    })
                }


            }

        }

    ]);

})(angular);