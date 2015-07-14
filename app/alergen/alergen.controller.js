(function (angular) {

    'use strict';

    angular.module('onlineCookbook')
        .controller('AlergenController', ['alergenService', '$window', '$scope',
            function (alergenService, $window, $scope) {

                var al = $scope.al = this;
               
                al.alergens = [];
                al.alergen = null;
                //selected item from table
                al.selected = {};
                al.searchString = "";
                al.showAlergensTable = true;
                //new item added
                al.newItem = {};

               //detail and views
                al.showDetails = false;
                al.showEditView = false;
                al.showAddView = false;

                //pagination
                al.pageNumber = 1;
                var pageSize = 5; // 5 alergens per page

                al.showAdd = function () {
                    al.showAddView = true;
                    al.showEditView = false;
                    al.showDetails = false;
                };

               
               
                al.get = function () {

                    if (al.searchString.length > 0) {
                       
                        alergenService.getAlergensByName(al.searchString).success(function (data) {
                            al.alergens = data;
                            
                        }).error(function (error) {
                            al.status = 'Unable to get alergen: ' + error.message;
                        });
                    }
                    else {
                        //inace mi dohvati sve
                        alergenService.getAlergens(al.pageNumber, pageSize).success(function (data) {
                            
                            al.alergens = data;

                        }).error(function (error) {
                            al.status = 'Unable to get alergen: ' + error.message;
                        });
                    }

                };

                //get alergen details
                //al.getAlergenDetails = function (item) {

                //    al.alergens = [];
                //    al.alergens.push(item);
                //    al.showAlergensTable = true;
                //    al.showDetails = true;
                //}

                al.showEdit = function (item) {
                    al.selected = {};
                    al.selected = item;
                    al.showDetails = false;
                    al.showEditView = true;
                    al.showAddView = false;
                };

 
               al.nextInAlergensList = function () {
                    al.pageNumber++;
                    console.log();
                    alergenService.getAlergens(al.pageNumber, pageSize).success(function (data) {
                        al.alergens = data;                                               

                        if (data.length == 0)
                            al.pageNumber--;

                    });
                };

                al.backInAlergensList = function () {

                    al.pageNumber--;
                    if (al.pageNumber < 1)
                        al.pageNumber = 1;

                    alergenService.getAlergens(al.pageNumber, pageSize).success(function (data) {                                                 
                        al.alergens = data;
                    });
                };


              al.put = function (item) {
                    console.log('maja');
                    al.selected.AlergenName = item.AlergenName;
                    al.selected.Abrv = item.Abrv;
                    al.selected.Id = item.Id;
                
                    alergenService.putAlergen(al.selected)
                       .success(function (data) {
                           al.selected = data;
                           $window.alert("Alergen changed!");
                           al.showEdit();
                       })
                       .error(function (data) {
                           
                           $window.alert("Name already exist!");
                           console.log(al.selected);
                           console.log(data);
                           al.get();
                           
                       });
                };
                 

                
              al.post = function (item) {
                    al.showDetails = false;
                    al.showEditView = false;
                    al.showAddView = false;

                  alergenService.postAlergen(item)
                        .success(function (data) {
                            
                            console.log(data);
                            $window.alert("Added successfully!");
                            al.get();
                            al.selected = {};
                        })
                        .error(function (data) {
                            console.log('greska');
                            $window.alert("Cannot be added!");
                            console.log(data);
                        });
                };

                
              al.delete = function (item) {

                  if (confirm("Do you wana delete item named " + item.AlergenName + "?")) {

                      alergenService.deleteAlergen(item.Id)
                          .success(function (data) {
                              console.log(data);
                              $window.alert("Deleted");
                              al.get();
                              al.selected = {};
                              
                          })
                          .error(function (data) {
                              console.log(data);
                          });
                  }
              };

            
             
            

            }]); 
})(angular);
