'use strict';

(() => {
  angular.module('app')
         .factory('FilterFiestaSrvc', FilterFiestaSrvc);

  FilterFiestaSrvc.$inject = ['$filter'];

  function FilterFiestaSrvc($filter) {
    var service = {};
    service.Filter = Filter;
    service.GetOptions = GetOptions;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
     * Filters a list of fiesta using filterOption and filterCommodity
     * Returns the filtered array of fiesta
     * - @param {array} fiestaList
     * - @param {object} filterOption
     * - @param {array} filterCommodity
     */
    function Filter(fiestaList, filterOption, filterCommodity){

      // Filter by commodity
      if(filterCommodity.length > 0){
        let filterByComm = [];
        for (let i = 0; i < fiestaList.length; i++) {
          // Check a fiesta has atleast one in the filterCommodity
          if(fiestaList[i].commodity && findOne(fiestaList[i].commodity, filterCommodity)){
            filterByComm.push(fiestaList[i]);
          }
        }
        fiestaList = filterByComm;
      }
      // filter by year, region, and consortium
      let filteredFiestas = $filter('filter')(fiestaList, filterOption);
      return filteredFiestas;
    }

    /**
     * Derives filter options of 'type' from a fiesta list
     * Returns a list of available fitler options
     * - @param {array} list
     * - @param {string} type
     */
    function GetOptions(list, type) {
      let options = [];
      switch(type){
        case 'year':
          for(let i=0; i<list.length; i+=1)
            if(list[i].startDate && options.indexOf(new Date(list[i].startDate).getFullYear()) == -1)
              options.push(new Date(list[i].startDate).getFullYear());
          break;

        case 'region':
          for(let i=0; i<list.length; i+=1)
            if(list[i].region && options.indexOf(list[i].region) == -1)
              options.push(list[i].region);
          break;

        case 'consortium':
          for(let i=0; i<list.length; i+=1)
            if(list[i].consortium && options.indexOf(list[i].consortium) == -1)
              options.push(list[i].consortium);
          break;

        case 'commodity':
          for(let i=0; i<list.length; i+=1){
            if(!list[i].commodity)
              continue;
            for(let j=0; j<list[i].commodity.length; j+=1){
              if(options.indexOf(list[i].commodity[j]) == -1)
                options.push(list[i].commodity[j]);
            }
          }
          options = options.sort();
          break;
      }

      return options;
    }

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/

    /**
     * Finds if haystack has atleast one element in arr
     * Returns true if there is, otherwise false
     * - @param {array} haystack
     * - @param {array} arr
     */
    function findOne(haystack, arr) {
      return arr.some(function (v) {
          return haystack.indexOf(v) >= 0;
        });
    }
  }
})();
