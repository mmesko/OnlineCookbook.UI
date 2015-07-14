(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service("ingradientService", ['$http', 'BASE_CONSTS', 
        function ($http, BASE_CONSTS) {

           

            return {

                // Get alergen by name
                getIngradientsByName: function (name) {

                    return $http.get(BASE_CONSTS.INGRADIENT + "/getByName/" + name);
                },

                // Get alergens
                getIngradients: function (pageNumber, pageSize) {
                    return $http.get(BASE_CONSTS.INGRADIENT + "/" + pageNumber + "/" + pageSize);
                },


                //editing ingradient
                putIngradient: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: BASE_CONSTS.INGRADIENT + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                // post into db
                postIngradient: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'post',
                        url: BASE_CONSTS.INGRADIENT + "/",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)
                    })
                },

                // delete from db
                deleteIngradient: function (id) {
                    console.log($.param(id));
                    return $http({

                        method: 'delete',
                        url: BASE_CONSTS.INGRADIENT + "/" + id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(id)

                    })}
                }

 }]);

})(angular);