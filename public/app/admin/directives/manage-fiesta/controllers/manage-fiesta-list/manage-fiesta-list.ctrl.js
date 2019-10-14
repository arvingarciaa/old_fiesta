'use strict';

(function () {
  angular.module('app')
        .controller('ManageFiestaListCtrl', ManageFiestaListCtrl);

	ManageFiestaListCtrl.$inject = ['$scope', '$window', '$location', 'ManageFiestaListSrvc',
        'PageHandlerSrvc', 'FilterFiestaSrvc', 'SortFiestaSrvc', 'FiestaSrvc', 'UtilsSrvc'];

	function ManageFiestaListCtrl($scope, $window, $location, ManageFiestaListSrvc, PageHandlerSrvc, FilterFiestaSrvc, SortFiestaSrvc, FiestaSrvc, UtilsSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    $scope.fiestas = []; /** {array} that contains all fiesta */
    $scope.rows = [];    /** {array} that contains fiesta currently displayed */
    $scope.fiestaNumber = 0;
    $scope.noFiesta = false;
    $scope.pages = [];
    $scope.htmlPopover = '';

    /** Choice selected as filter options */
    $scope.yearChoice = null;
    $scope.regionChoice = null;
    $scope.consorChoice = null;
    $scope.selectedComm = [];

    /** Filter options derived from fiesta */
    $scope.yearOptions = [];
    $scope.regionOptions = [];
    $scope.consorOptions = [];
    $scope.commOptions = [];
    $scope.filteredByCommodity = false;

    /***************************************************************************
     @INFO: Constants and Local Variables
    ***************************************************************************/
    let PageHandler;
    const filterOptions = {
      startDate: '',
      region: '',
      consortium: ''
    };
    

    /***************************************************************************
     @INFO: Initializations
    ***************************************************************************/
    $scope.$watch('fiestaNumber', function() {
        $scope.noFiesta = ($scope.fiestaNumber == 0);
    });
    $scope.htmlPopover = ManageFiestaListSrvc.GetPopover();
    /* Get fiesta List */
    ManageFiestaListSrvc.GetFiestas()
			.then(function (fiestas) {
        $scope.fiestas = fiestas;
        /* Display and Pagination */
        PageHandler = new PageHandlerSrvc.PageHandler(12, $scope.fiestas);
        $scope.fiestaNumber = fiestas.length;
        $scope.pages = new Array(PageHandler.numPages);
        $scope.rows = PageHandler.initialize();
        /* Get Filter Options */
        $scope.yearOptions = FilterFiestaSrvc.GetOptions(fiestas, 'year');
        $scope.regionOptions = FilterFiestaSrvc.GetOptions(fiestas, 'region');
        $scope.consorOptions = FilterFiestaSrvc.GetOptions(fiestas, 'consortium');
        $scope.commOptions = FilterFiestaSrvc.GetOptions(fiestas, 'commodity');
			})
			.catch(function (err) {
        UtilsSrvc.error('Error retrieving fiestas! ['+err.toString()+']');
			});

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    /**
     * Goes to the next page in displaying fiestas
     */
     $scope.nextPage = function () {
       if (PageHandler && PageHandler.canNextPage())
         $scope.rows = PageHandler.nextPage();
     };

     /**
      * Goes to the previous page in displaying fiestas
      */
     $scope.prevPage = function () {
       if (PageHandler && PageHandler.canPrevPage())
         $scope.rows = PageHandler.prevPage();
     };

     /**
      * Goes to a specific page in displaying fiestas
      * - @param {number} page - specific page
      */
     $scope.changePage = function (page) {
       if (!PageHandler)
           return;
         $scope.rows = PageHandler.changePage(page);
     };

     /**
      * Resets all the variables concerning filter options
      */
     $scope.resetFilter =function () {
       // reset filterOptions
       filterOptions.startDate =  '';
       filterOptions.region = '';
       filterOptions.consortium = '';

       // clear selected commodities
       $scope.selectedComm = [];
       $scope.filteredByCommodity = false;

       // display original format
       $scope.rows = PageHandler.changeFiestaList($scope.fiestas);
       $scope.fiestaNumber = $scope.fiestas.length;
       $scope.pages = new Array(PageHandler.numPages);

       // reset filter choices
       $scope.yearChoice = null;
       $scope.regionChoice = null;
       $scope.consorChoice = null;
     };

     /**
      * Filter out fiestas based on filter and type
      * - @param {string} filter - filter to be used
      * - @param {type} type - enum-like usage for distinguishing filter types
      */
     $scope.filter = function (filter, type) {
       if (!PageHandler)
           return;

      // check filter type
       switch(type){
         case 'year':
           $scope.yearChoice = filter;
           filterOptions.startDate = (filter!=null)? filter: '';
           break;

         case 'region':
           $scope.regionChoice = filter;
           filterOptions.region = (filter!=null)? filter: '';
           break;

         case 'consortium':
           $scope.consorChoice = filter;
           filterOptions.consortium = (filter!=null)? filter: '';
           break;
       }

       let filteredFiestas = FilterFiestaSrvc.Filter($scope.fiestas, filterOptions, $scope.selectedComm);

       // update number of fiesta, number of pages and fiestas displayed by PageHandler
       $scope.fiestaNumber = filteredFiestas.length;
       $scope.rows = PageHandler.changeFiestaList(filteredFiestas);
       $scope.pages = new Array(PageHandler.numPages);

      //  update filter by community button
       if(filter == null &&  type == null && $scope.selectedComm.length > 0)
         $scope.filteredByCommodity = true;
       else if(filter == null &&  type == null && $scope.selectedComm.length <= 0)
         $scope.filteredByCommodity = false;

      // reset sort parameters
      resetSort();
     };

     /**
      * Sort out fiestas based on option and reverse
      * - @param {string} option - sorting option to use
      * - @param {boolean} reverseOption - true if reversed
      */
     $scope.sort = function (option, reverseOption) {

       if(angular.element('#'+option).hasClass('focused-sort')){
         $scope.reverse[option] = !$scope.reverse[option];
         reverseOption = $scope.reverse[option];
       }
       else{
         resetSort();
         angular.element('.sort-option').removeClass('focused-sort');
         angular.element('#'+option).addClass('focused-sort');
       }
       let filteredFiestas = SortFiestaSrvc.Sort(PageHandler.getFiesta(), option, reverseOption);
       // update fiestas displayed
       $scope.rows = PageHandler.changeFiestaList(filteredFiestas);
     };

     /**
      * Adds a commodity in selectedComm
      * - @param {string} commodity - commodity to add
      */
     $scope.addCommodityFilter = function (commodity) {
       if(!$scope.selectedComm.includes(commodity))
         $scope.selectedComm.push(commodity);
     };

     /**
      * Removes a commodity in selectedComm
      * - @param {string} commodity - commodity to remove
      */
     $scope.removeCommodityFilter = function (commodity) {
       $scope.selectedComm.splice($scope.selectedComm.indexOf(commodity), 1);
     };

     /**
      * Redirects page to manage a specific fiesta
      * - @param {string} id - fiesta id
      */
     $scope.manageFiesta = function (id) {
       $location.path('/admin/manage/'+id);
     };

     /**
      * Deletes a fiesta in database
      * - @param {string} id - fiesta id
      */
     $scope.deleteFiesta = function (id) {
       if(confirm('Delete this fiesta?')){
         FiestaSrvc.DeleteOne(id)
          .then(function (res) {
            UtilsSrvc.RemoveObjectInList($scope.fiestas, res);
            // display original format
            $scope.rows = PageHandler.changeFiestaList($scope.fiestas);
            $scope.fiestaNumber = $scope.fiestas.length;
            $scope.pages = new Array(PageHandler.numPages);
            /* Get Filter Options */
            $scope.yearOptions = FilterFiestaSrvc.GetOptions($scope.fiestas, 'year');
            $scope.regionOptions = FilterFiestaSrvc.GetOptions($scope.fiestas, 'region');
            $scope.consorOptions = FilterFiestaSrvc.GetOptions($scope.fiestas, 'consortium');
            $scope.commOptions = FilterFiestaSrvc.GetOptions($scope.fiestas, 'commodity');
          });
       }
     };

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    /**
     * Resets any type of sort selected by user
     */
     function resetSort() {
       angular.element('.sort-option').removeClass('focused-sort');
       for (var member in $scope.reverse) {
           $scope.reverse[member] = false;
       }
     }
  }
})();
