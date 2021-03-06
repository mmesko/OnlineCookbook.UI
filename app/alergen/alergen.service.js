﻿(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service('alergenService', ['$http', 'routePrefix',
        function ($http, routePrefix) {

            

            return {

                // Get alergen by name
                getAlergensByName: function (name) {
                    return $http.get(routePrefix.alergen + "/getByName/" + name);
                },

                // Get alergens
                getAlergens: function (pageNumber, pageSize){
                    console.log('dsaff');
                    return $http.get(routePrefix.alergen + "/" + pageNumber + "/" + pageSize);
                },

                postAlergen: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'post',
                        url: routePrefix.alergen + "/",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })},

                putAlergen: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: routePrefix.alergen + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                // delete from db
                deleteAlergen: function (id) {
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