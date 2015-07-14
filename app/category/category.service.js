(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service("categoryService", ['$http', 'BASE_CONSTS',
    function ($http,BASE_CONSTS) {

            

            return {

                // Get alergen by name
                getCategoryByName: function (name) {
                    
                    return $http.get(BASE_CONSTS.CATEGORY + "/getByName/" + name);
                },

                // Get alergens
                getCategorys: function (pageNumber, pageSize) {
                    return $http.get(BASE_CONSTS.CATEGORY + "/" + pageNumber + "/" + pageSize);
                },

     
                putCategory: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: BASE_CONSTS.CATEGORY + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                }

            }





        }

    ]);

})(angular);