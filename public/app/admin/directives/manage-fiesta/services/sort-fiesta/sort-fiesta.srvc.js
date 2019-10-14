'use strict';

(() => {
  angular.module('app')
         .factory('SortFiestaSrvc', SortFiestaSrvc);

  SortFiestaSrvc.$inject = ['$filter'];

  function SortFiestaSrvc($filter) {
    var service = {};
    service.Sort = Sort;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
     * Sorts fiestaList based on option and reverse
     * Returns a list of sorted fiesta
     * - @param {array} fiestaList
     * - @param {string} option
     * - @param {boolean} reverse
     */
     function Sort(fiestaList, option, reverse){
       let filteredFiestas = $filter('orderBy')(fiestaList, option, reverse);
       return filteredFiestas;
     }
  }
})();
