(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service("ingradientService", ['$http', 'routePrefix',
        function ($http, routePrefix) {

           

            return {

                // Get alergen by name
                getIngradientsByName: function (name) {

                    return $http.get(routePrefix.ingradient + "/getByName/" + name);
                },

                // Get alergens
                getIngradients: function (pageNumber, pageSize) {
                    return $http.get(routePrefix.ingradient + "/" + pageNumber + "/" + pageSize);
                },


                //editing ingradient
                putIngradient: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: routePrefix.ingradient + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                // post into db
                postIngradient: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'post',
                        url: routePrefix.ingradient + "/",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)
                    })
                },

                // delete from db
                deleteIngradient: function (id) {
                    console.log($.param(id));
                    return $http({

                        method: 'delete',
                        url: routePrefix.ingradient + "/" + id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(id)

                    })}
                }

 }]);

})(angular);