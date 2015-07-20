(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service('recipeService', ['$http', 'routePrefix',
        function ($http, routePrefix) {



            return {

                // Get alergen by name
                getRecipesByName: function (name) {
                    return $http.get(routePrefix.recipe + "/getByName/" + name);
                },

                // Get alergens
                getRecipes: function (pageNumber, pageSize) {
                    console.log('dsaff');
                    return $http.get(routePrefix.recipe + "/" + pageNumber + "/" + pageSize);
                },

                postRecipe: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'post',
                        url: routePrefix.recipe + "/",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                putRecipe: function (data) {
                    console.log($.param(data));
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
                        url: routePrefix.alergen + "/" + id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(id)

                    })
                }


            }

        }

    ]);

})(angular);