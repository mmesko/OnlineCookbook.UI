(function (angular) {

    'use strict';

    angular.module('onlineCookbook')
        .controller('CategoryController', ['categoryService', '$window','$scope',
            function (categoryService, $window, $scope) {

                var ct = $scope.ct = {};

                ct.categorys = [];
                ct.category = null;
                //selected item from table
               // ig.selected = {};
                ct.searchString = "";
                ct.showCategoryTable = true;
                //new item added
                //ig.newItem = {};

                //detail and views
                ct.showDetails = false;
                ct.showEditView = false;
                ct.showAddView = false;

                //pagination
                ct.pageNumber = 1;
                var pageSize = 5; // 10 alergens per page

                //add url for image
               
               

                ct.showAdd = function () {
                    ct.showAddView = true;
                    ct.showEditView = false;
                    ct.showDetails = false;
                };


            


                //search alergen by name
                ct.get = function () {


                    if (ct.searchString.length > 0) {
                        CategoryService.getCategoryByName(ct.searchString).success(function (data) {
                            ct.categorys = data;

                        }).error(function (error) {
                            ct.status = 'Unable to get category: ' + error.message;
                        });
                    }
                    else {
                        //inace mi dohvati sve
                        categoryService.getCategorys(ct.pageNumber, pageSize).success(function (data) {
                            ct.categorys = data;

                        }).error(function (error) {
                            ct.status = 'Unable to get category: ' + error.message;
                        });
                    }

                };

           

                ////get alergen details
                //ct.getCategoryDetails = function (item) {

                //    ct.categorys = [];
                //    ct.categorys.push(item);
                //    ct.showCategoryTable = true;
                //    ct.showDetails = true;
                //}

                ct.showEdit = function (item) {
                    ct.selected = {};
                    ct.selected = item;
                    ct.showDetails = false;
                    ct.showEditView = true;
                    ct.showAddView = false;
                };


                ct.put = function (item) {
                    console.log('maja');
                    ct.selected.CategoryName = item.CategoryName;
                    ct.selected.Abrv = item.Abrv;
                    ct.selected.Id = item.Id;

                    CategoryService.putCategory(ct.selected)
                       .success(function (data) {
                           ct.selected = data;
                           $window.alert("Ingradient changed!");
                           ct.showEdit();
                       })
                       .error(function (data) {

                           $window.alert("Name already exist!");
                           console.log(ct.selected);
                           console.log(data);
                       });
                };


            }]);
})(angular);
