(function (angular) {

    'use strict';

    angular.module('onlineCookbook')
        .controller('IngradientController', ['ingradientService', '$window', '$scope',
            function (ingradientService, $window, $scope) {

                var ig = $scope.ig = this;

                ig.ingradients = [];
                ig.ingradient = null;
                //selected item from table
                ig.selected = {};
                ig.searchString = "";
                ig.showIngradientsTable = true;
                //new item added
                ig.newItem = {};

                //detail and views
                ig.showDetails = false;
                ig.showEditView = false;
                ig.showAddView = false;

                //pagination
                ig.pageNumber = 1;
                var pageSize = 5; 

                ig.showAdd = function () {
                    ig.showAddView = true;
                    ig.showEditView = false;
                    ig.showDetails = false;
                };

                //search alergen by name
                ig.get = function () {                
                    if (ig.searchString.length > 0) {
                        ingradientService.getIngradientsByName(ig.searchString).success(function (data) {
                            console.log(data);
                            ig.ingradients = data;

                        }).error(function (error) {
                            ig.status = 'Unable to get ingradient: ' + error.message;
                        });
                    }
                    else {
                        //inace mi dohvati sve
                        ingradientService.getIngradients(ig.pageNumber, pageSize).success(function (data) {
                            ig.ingradients = data;

                        }).error(function (error) {
                            ig.status = 'Unable to get ingradient: ' + error.message;
                        });
                    }

                };

               // //get alergen details
               //ig.getIngradientDetails = function (item) {

               //    ig.ingradients = [];
               //    ig.ingradients.push(item);
               //    ig.showIngradientsTable = true;
               //    ig.showDetails = true;
               // }

                ig.showEdit = function (item) {
                    ig.selected = {};
                    ig.selected = item;
                    ig.showDetails = false;
                    ig.showEditView = true;
                    ig.showAddView = false;
                };

                ig.nextInIngradientsList = function () {
                    ig.pageNumber++;
                   
                    ingradientService.getIngradients(ig.pageNumber, pageSize).success(function (data) {
                        ig.ingradients = data;
                        console.log();
                        if (data.length == 0)
                            ig.pageNumber--;

                    });
                };

                ig.backInIngradientsList = function () {

                    ig.pageNumber--;
                    if (ig.pageNumber < 1)
                        ig.pageNumber = 1;

                    ingradientService.getIngradients(ig.pageNumber, pageSize).success(function (data) {                                                  
                        ig.ingradients = data;
                    });
                };



                //ovdje koristim editView

                ig.put = function (item) {
                    console.log('maja');
                    ig.selected.IngradientName = item.IngradientName;
                    ig.selected.Abrv = item.Abrv;
                    ig.selected.Id = item.Id;

                    ingradientService.putIngradient(ig.selected)
                       .success(function (data) {
                           ig.selected = data;
                           $window.alert("Ingradient changed!");
                           ig.showEdit();
                       })
                       .error(function (data) {

                           $window.alert("Name already exist!");
                           console.log(ig.selected);
                           console.log(data);
                       });
                };



                ig.post = function (item) {
                    ig.showDetails = false;
                    ig.showEditView = false;
                    ig.showAddView = false;

                    ingradientService.postIngradient(item)
                          .success(function (data) {

                              console.log(data);
                              $window.alert("Added successfully!");
                              ig.get();
                              ig.selected = {};
                          })
                          .error(function (data) {
                              console.log('greska');
                              $window.alert("Cannot be added!");
                              console.log(data);
                          });
                };


                ig.delete = function (item) {

                    if (confirm("Jeste li sigurni? " + item.Id)) {

                        ingradientService.deleteIngradient(item.Id)
                            .success(function (data) {
                                console.log(data);
                                $window.alert("Deleted");
                                ig.get();
                                ig.selected = {};

                            })
                            .error(function (data) {
                                console.log(data);
                            });
                    }
                    //al.selected = {};
                };

             





            }]);
})(angular);
