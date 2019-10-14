'use strict';

(function () {
  angular.module('app')
        .controller('AboutCtrl', AboutCtrl);

	AboutCtrl.$inject = ['$scope', '$routeParams', '$route', '$filter', 'FiestaSrvc', 'UtilsSrvc', 'NgMap'];

	function AboutCtrl($scope, $routeParams, $route, $filter, FiestaSrvc, UtilsSrvc, NgMap) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/

    $scope.fiesta = {};
    $scope.googleMapApi = 'AIzaSyC8Ma9Y11olmbaqmMO1bfpuz4g_6pK-_3E';
    $scope.address = "";
    let fiestaId = '';

    /***************************************************************************
     @INFO: Initializations
    ***************************************************************************/
    FiestaSrvc.GetOne($routeParams.fiestaId)
      .then(function (fiesta) {
        $scope.fiesta = fiesta;
        $scope.fiesta.oldCoordinates = fiesta.coordinates;
        if(fiesta.magazine) {
          $scope.fiesta.mag_thumb = $scope.fiesta.magazine.replace('.pdf', '-0.png');
        }
        fiestaId = $scope.fiesta._id;

        FiestaSrvc.GetAllCommodities()
          .then(function (commodities) {
            // used in editing commodity list of fiesta
              $scope.commodities = commodities;
          })
          .catch(function (err) {
            UtilsSrvc.error(err);
            UtilsSrvc.ToastError('Cannot retrieved commodities!');
          });
      })
      .catch(function (err) {
        UtilsSrvc.error(err);
        UtilsSrvc.ToastError('Cannot retrieved fiesta details!');
      });

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.EditItem = EditItem;
    $scope.EditTitle = EditTitle;
    $scope.EditDescription = EditDescription;
    $scope.EditDate = EditDate;
    $scope.EditVenue = EditVenue;
    $scope.EditRegion = EditRegion;
    $scope.EditConsortium = EditConsortium;
    $scope.EditCommodity = EditCommodity;
    $scope.EditVicinityMap = EditVicinityMap;
    $scope.EditCoordinates = EditCoordinates;
    $scope.EditMagazine = EditMagazine;
    $scope.FilterCommodities = FilterCommodities;
    $scope.AddCommodity = AddCommodity;
    $scope.getDrag = getDrag;
    $scope.refresh = refresh;

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    function EditItem(item, oldValue, oldValue2) {
      if(item == 'date'){
        $scope['startDate'] = new Date(oldValue);
        $scope['endDate'] = new Date(oldValue2);
      }
      else if (item == 'consortium'){
        $scope['consortium'] = oldValue;
        $scope['consortiumFull'] = oldValue2;
      }
      else
        $scope[item] = oldValue;
    }

    function EditTitle(title) {
      if (!title || title.trim() == '') {
        UtilsSrvc.ToastError('Enter valid title!');
        return;
      }
      $scope.titleLoading = true;
      FiestaSrvc.EditTitle(fiestaId, title)
        .then(function (data) {
          UtilsSrvc.wait(1000, function () {
            $scope.titleLoading = false;
            $scope.fiesta.title = data.title;
            angular.element('#editTitle').modal('hide');
            UtilsSrvc.ToastSuccess('Successfully edited title!');
            $route.reload();
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    }

    function EditDescription(description) {
      if (!description || description.trim() == '') {
        UtilsSrvc.ToastError('Enter valid description!');
        return;
      }
      $scope.descriptionLoading = true;
      FiestaSrvc.EditDescription(fiestaId, description)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
          $scope.descriptionLoading = false;
          $scope.fiesta.description = data.description;
          angular.element('#editDescription').modal('hide');
          UtilsSrvc.ToastSuccess('Successfully edited description!');
        });
      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err.toString());
      });
    }

    function EditDate(startDate, endDate) {
      if (!startDate) {
        UtilsSrvc.ToastError('Enter valid start date!');
        return;
      }
      if(!endDate){
        UtilsSrvc.ToastError('Enter valid end date!');
        return;
      }
      if (startDate > endDate) {
        UtilsSrvc.ToastError('Start date must not be later than the end date!');
        return;
      }
      $scope.dateLoading = true;
      FiestaSrvc.EditDate(fiestaId, startDate, endDate)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
          $scope.dateLoading = false;
          $scope.fiesta.startDate = data.startDate;
          $scope.fiesta.endDate = data.endDate;
          angular.element('#editDate').modal('hide');
          UtilsSrvc.ToastSuccess('Successfully edited dates!');
        });
      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err.toString());
      });
    }

    function EditVenue(venue) {
      if (!venue || venue.trim() == '') {
        UtilsSrvc.ToastError('Enter valid venue!');
        return;
      }
      $scope.venueLoading = true;
      FiestaSrvc.EditVenue(fiestaId, venue)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
          $scope.venueLoading = false;
          $scope.fiesta.venue = data.venue;
          angular.element('#editVenue').modal('hide');
          UtilsSrvc.ToastSuccess('Successfully edited venue!');
        });

      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err.toString());
      });
    }

    function EditRegion(region) {
      if (!region || region.trim() == '') {
        UtilsSrvc.ToastError('Enter valid region!');
        return;
      }
      $scope.regionLoading = true;
      FiestaSrvc.EditRegion(fiestaId, region)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
          $scope.regionLoading = false;
          $scope.fiesta.region = data.region;
          angular.element('#editRegion').modal('hide');
          UtilsSrvc.ToastSuccess('Successfully edited region!');
        });

      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err.toString());
      });
    }

    function EditConsortium(consortium, consortiumFull) {
      if (!consortium) {
        UtilsSrvc.ToastError('Enter valid consortium acronym!');
        return;
      }
      if (!consortiumFull) {
        UtilsSrvc.ToastError('Enter valid consortium full name!');
        return;
      }
      $scope.consortiumLoading = true;
      FiestaSrvc.EditConsortium(fiestaId, consortium, consortiumFull)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
          $scope.consortiumLoading = false;
          $scope.fiesta.consortiumFull = data.consortiumFull;
          $scope.fiesta.consortium = data.consortium;
          angular.element('#editConsortium').modal('hide');
          UtilsSrvc.ToastSuccess('Successfully edited consortium!');
        });

      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err.toString());
      });
    }

    function EditCommodity(selectedCommodities) {
      let commodities = [];

      for (var i = 0; i < selectedCommodities.length; i++) {
        commodities.push(selectedCommodities[i].text.replace(/\-/g, ' '));
      }
      $scope.commodityLoading = true;
      FiestaSrvc.EditCommodity(fiestaId, commodities)
        .then(function (data) {
          UtilsSrvc.wait(1000, function () {
            $scope.commodityLoading = false;
            $scope.fiesta.commodity = data.commodity;
            angular.element('#editCommodity').modal('hide');
            UtilsSrvc.ToastSuccess('Updated commodities!');
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    }

    function EditVicinityMap(image) {
      if(!image){
        UtilsSrvc.ToastError('No photo uploaded!');
        return;
      }
      $scope.loading = true;
      FiestaSrvc.EditVicinityMap(fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            $scope.fiesta.vicinityMap = data.vicinityMap;
            UtilsSrvc.ToastSuccess('Updated vicinity map!');
            $scope.inputImage = null;
            $scope.loading = false;
            angular.element('#editVicinityMap').modal('hide');
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    }

    $scope.resetMap = function () {
      $route.reload();
    };

    $scope.changeLocation = function () {
      let vm = this;
      $scope.place = vm.getPlace();
      $scope.coordinates = {
        lat: $scope.place.geometry.location.lat(),
        lng: $scope.place.geometry.location.lng()
      };
      $scope.fiesta.coordinates = {
        lat: $scope.place.geometry.location.lat(),
        lng: $scope.place.geometry.location.lng()
      };
    };

    $scope.addLocation = function () {
      let vm = this;
      $scope.place = vm.getPlace();
      $scope.coordinates = {
        lat: $scope.place.geometry.location.lat(),
        lng: $scope.place.geometry.location.lng()
      };
    };
    function EditCoordinates(mapId) {
      NgMap.getMap({id:mapId}).then(function (map) {
        let pos = map.markers[0].position;
        let coordinates = {
          lat: pos.lat(), lng: pos.lng()
        };
        $scope.coordinatesLoading = true;
        FiestaSrvc.EditGoogleMap(fiestaId, coordinates)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              $scope.coordinatesLoading = false;
              $scope.fiesta.coordinates = data.coordinates;
              UtilsSrvc.ToastSuccess('Location was saved!');
              $route.reload();
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError(err.toString());
          });
      });
    }

    function EditMagazine(magazine) {
      if(!magazine){
        UtilsSrvc.ToastError('No pdf uploaded!');
        return;
      }
      $scope.magazineLoading = true;
      FiestaSrvc.EditMagazine(fiestaId, magazine)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(5000, function () {
            $scope.fiesta.magazine = data.magazine;
            UtilsSrvc.ToastSuccess('Updated magazine!');
            $scope.inputMagazine = null;
            $scope.magazineLoading = false;
            if(data.magazine) $scope.fiesta.mag_thumb = data.magazine.replace('.pdf', '-0.png');
            angular.element('#editMagazine').modal('hide');
            $route.reload();
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    }

    function FilterCommodities(query) {
      return $filter('filter')($scope.commodities, query);
    }

    function AddCommodity(newCommodity) {
      if(!newCommodity || !newCommodity.sector || newCommodity.sector.trim() ==''){
        UtilsSrvc.ToastError('Please select a sector!');
        return;
      }
      if(!newCommodity || !newCommodity.commodity || newCommodity.commodity.trim() ==''){
        UtilsSrvc.ToastError('Please enter a commodity!');
        return;
      }
      newCommodity.commodity = newCommodity.commodity.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      if (UtilsSrvc.Ask('Add \''+newCommodity.commodity+'\' commodity to sector '+newCommodity.sector)) {
        $scope.extraCommodityLoading = true;
        FiestaSrvc.AddCommodity(newCommodity.commodity, newCommodity.sector)
          .then(function (sector) {
            UtilsSrvc.wait(1000, function () {
              $scope.extraCommodityLoading = false;
              if(sector.name == newCommodity.sector && sector.commodities.indexOf(newCommodity.commodity)!=-1){
                $scope.commodities.push(newCommodity.commodity);
                $scope.commodities.sort();
                UtilsSrvc.ToastSuccess(newCommodity.commodity + ' was added to '+sector.name+' sector.');
                newCommodity.sector = '';
                newCommodity.commodity = '';
              }
              else{
                UtilsSrvc.ToastError('Something went wrong!');
                UtilsSrvc.error(sector);
              }
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError(err.toString());
          });
      }
    }

    function getDrag(e) {
      $scope.coordinates = {
        lat: e.latLng.lat() , lng: e.latLng.lng()
      };
      angular.element('#pac-input').val('')
      angular.element('#pac-input2').val('')
    }

    function refresh() {
      $route.reload();
    }
  }
})();
