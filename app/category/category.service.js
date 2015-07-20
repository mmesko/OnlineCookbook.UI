(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service("categoryService", ['$http', 'routePrefix',
    function ($http, routePrefix) {

            

            return {

                // Get alergen by name
                getCategoryByName: function (name) {
                    
                    return $http.get(routePrefix.category + "/getByName/" + name);
                },

                // Get alergens
                getCategorys: function (pageNumber, pageSize) {
                    return $http.get(routePrefix.category + "/" + pageNumber + "/" + pageSize);
                },

     
                putCategory: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: routePrefix.category + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                }

            }





        }

    ]);

})(angular);