"use strict";

(() => {
  angular.module('app')
         .factory('ManageFiestaListSrvc', ManageFiestaListSrvc);

  ManageFiestaListSrvc.$inject = ['$sce', '$q', '$http'];

  function ManageFiestaListSrvc($sce, $q, $http){
    var service = {};
    service.GetPopover = GetPopover;
    service.GetFiestas = GetFiestas;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
     * Returns an html template for popover in fiesta options
     */
    function GetPopover() {
      let dropdown = '<ul class="fiesta-options-dropdown">'+
                        '<li>'+
                          '<a ng-click="manageFiesta(fiesta._id)"> Manage Fiesta</a>'+
                        '</li>'+
                        '<li>'+
                          '<a> Delete </a>'+
                        '</li>'+
                    '</ul>';
      return ($sce.trustAsHtml(dropdown));
    }

    /**
     * Retrieves all fiesta from database
     * Returns the list of fiesta
     */
    function GetFiestas() {
      let deferred = $q.defer();
      // function for receiving successful response
      function success(response) {
        deferred.resolve(response.data);
      }
      // function for catching error
      function error(error) {
        deferred.reject(error);
      }
      $http.get('api/fiesta-admin')
           .then(success, error);
      return deferred.promise;
    }
  }
})();
