"use strict";

(() => {
  angular.module("app")
         .factory("CreateFiestaModalSrvc", CreateFiestaModalSrvc);

  CreateFiestaModalSrvc.$inject = ["$http", "$q"];

  function CreateFiestaModalSrvc($http, $q) {
    var service = {};
    service.CreateFiesta = CreateFiesta;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
     * Inserts a new fiesta to the database
     * - @param {string} title
     * - @param {date} startDate
     * - @param {date} endDate
     */
    function CreateFiesta(title, startDate, endDate){
      let deferred = $q.defer();
      let fiesta = {
        'title': title,
        'startDate': startDate,
        'endDate': endDate
      };
      // function for receiving successful response
      function success(response) {
        deferred.resolve(response.data);
      }
      // function for catching error
      function error(error) {
        deferred.reject(error);
      }
      $http.post("api/fiesta", fiesta)
           .then(success, error);
      return deferred.promise;
    }
  }

})();
