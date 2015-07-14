(function (angular) {

    'use strict';

    angular.module("onlineCookbook").service('alergenService', ['$http', 'BASE_CONSTS',
        function ($http, BASE_CONSTS) {

            

            return {

                // Get alergen by name
                getAlergensByName: function (name) {
                    return $http.get(BASE_CONSTS.ALERGEN + "/getByName/" + name);
                },

                // Get alergens
                getAlergens: function (pageNumber, pageSize){
                    console.log('dsaff');
                    return $http.get(BASE_CONSTS.ALERGEN + "/" + pageNumber + "/" + pageSize);
                },

                postAlergen: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'post',
                        url: BASE_CONSTS.ALERGEN + "/",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })},

                putAlergen: function (data) {
                    console.log($.param(data));
                    return $http({

                        method: 'put',
                        url: BASE_CONSTS.ALERGEN + "/" + data.Id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)

                    })
                },

                // delete from db
                deleteAlergen: function (id) {
                    console.log($.param(id));
                    return $http({

                        method: 'delete',
                        url: BASE_CONSTS.ALERGEN + "/" + id,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(id)

                    })
                }



              


             


            }

        }

    ]);

})(angular);