"use strict";

(() => {
	angular.module("app")
		     .controller("FiestaCtrl", FiestaCtrl);

	FiestaCtrl.$inject = ["$scope", "$filter", "$location", "FiestaSrvc", "AuthSrvc"];

	function FiestaCtrl($scope, $filter, $location, FiestaSrvc, AuthSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
		$scope.loggedIn = AuthSrvc.IsLoggedIn(true);
		if($scope.loggedIn) {
			$scope.name = AuthSrvc.GetAdmin().name;
			$scope.isAdmin = (AuthSrvc.GetAdmin().isAdmin) || false;
		}
		$scope.goTo = function (url) {
			$location.url(url);
		};

		$scope.fiestas = [];   /** {array} that contains all FIESTA */
		$scope.fiestas_magazines = []; /** {array} that contains all FIESTA Magazines */
		$scope.filteredCount = 0;
		$scope.selectedFiestas = []; /** {array} that contains all FIESTA in  carousel */
		$scope.active = 0;		/** index of current FIESTA active on carousel**/
		$scope.fiesta_cms = {}; /** contains details for CMS */
		$scope.reverse = [];  /** {array} tools: sort, ascending or descending **/
		$scope.consortiums = []; /** {array} tools: filter, option */
		$scope.regions = []; /** {array} tools: filter, options */
		$scope.years = []; /** {array} tools: filter, options */
		$scope.commodities = []; /** {array} tools: filter, options */
		$scope.consortiumFilter = ''; /** tools: filter, choice */
		$scope.regionFilter = ''; /** tools: filter, choice */
		$scope.yearFilter = ''; /** tools: filter, choice */
		$scope.commoditiesFilter = []; /** {array} tools: filter, choice */
		$scope.selectComm = []; /** {array} tools: filter, temporary choice */

		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Get FIESTA List
		 * Get FIESTA for carousel
		 * Get all filter options
		 * Get all FIESTA magazines
		 **/
		FiestaSrvc.GetAll()
		.then(function(data) {
			FiestaSrvc.GetOneCms('fiesta')
	     .then(function(cms){
	       $scope.fiesta_cms = cms[0];

			 // Initial order of FIESTA
			 $scope.fiestas = $filter('orderBy')(data, $scope.fiesta_cms.cards.option, $scope.fiesta_cms.cards.order);
			 $scope.filteredCount = $scope.fiestas.length;

			 //  FIESTA in carousel/slider
			 angular.forEach($scope.fiesta_cms.carousel.fiesta, function(value, index){
				 FiestaSrvc.GetOne(value)
				 .then(function(fiesta){
						$scope.selectedFiestas.push(fiesta);
				 });
			 });

			 angular.forEach($scope.fiestas, function(value, index){
				 //  List of magazines
				 if($.inArray(value.magazine, $scope.fiestas_magazines) == -1 && value.magazine != '') {
					 if(value.magazine) value.mag_thumb = value.magazine.replace('.pdf','-0.png');
					 $scope.fiestas_magazines.push(value);
				 }
				 //  List of consortium for filter
				 if ($.inArray(value.consortium, $scope.consortiums) == -1 && value.consortium != '') {
					 $scope.consortiums.push(value.consortium);
				 }
				 //  List of regions for filter
				 if ($.inArray(value.region, $scope.regions) == -1 && value.region != '') {
					 $scope.regions.push(value.region);
				 }
				 //  List of years for filter
				 if ($.inArray($filter('date')(value.startDate, 'yyyy'), $scope.years) == -1 && value.startDate != '') {
					 $scope.years.push($filter('date')(value.startDate, 'yyyy'));
				 }
				 //  List of all commodities for filter
				 angular.forEach(value.commodity, function(comm, ind){
					 if ($.inArray(comm, $scope.commodities) == -1 && comm != '') {
						 $scope.commodities.push(comm);
					 }
				 });
			 });
			 //  Initial order of FIESTA
			 $scope.fiestas_magazines = $filter('orderBy')($scope.fiestas_magazines,
				 $scope.fiesta_cms.pdf.sort.option, $scope.fiesta_cms.pdf.sort.order);
			})
		 });

		 /**
 		 * Sorts FIESTA Sub array List based on option and reverse
		 * - @param {string} option - sorting option to use
		 * - @param {boolean} reverseOption - true if reversed
 		 **/
		 $scope.sort = function (option, reverseOption) {
			//  Change the icon element in sort option
			 if(angular.element('#'+option).hasClass('bold')){
				 $scope.reverse[option] = !$scope.reverse[option];
				 reverseOption = $scope.reverse[option];
			 } else{
				 angular.element('.tools').removeClass('bold');
				 angular.element('.tools').removeClass('black');
				 angular.element('#'+option).addClass('bold');
				 angular.element('#'+option).addClass('black');
			 }
			  $scope.fiestas = $filter('orderBy')($scope.fiestas, option, $scope.reverse[option]);
		 };

		 /***************************************************************************
 		 @INFO: Scope Functions
 		***************************************************************************/
		 /**
 		 * Filters FIESTA Sub array List based on type and option
		 * - @param {string} type - filter option to use
		 * - @param {string} or {array} option - value of selected choices
 		 **/
		 $scope.filter = function(type, option) {
			 switch(type) {
				 case 'consortium':
				 		$scope.consortiumFilter = option;
				 		break;
				 case 'region':
				 		$scope.regionFilter = option;
						break;
				 case 'year':
				 		$scope.yearFilter = option;
						break;
				 case 'commodities':
				 		$scope.commoditiesFilter = option;
				 		break;
			 }

			 FiestaSrvc.GetAll()
	 		.then(function(data) {
				let fiestaList = [];
				if($scope.commoditiesFilter.length > 0) {
					angular.forEach(data, function(value, index){
						if(value.commodity && findOne(value.commodity, $scope.commoditiesFilter)){
							fiestaList.push(value);
						}
					});
					$scope.fiestas = $filter('filter')(fiestaList, {consortium: $scope.consortiumFilter});
				} else {
					$scope.fiestas = $filter('filter')(data, {consortium: $scope.consortiumFilter});
				}
				$scope.fiestas = $filter('filter')($scope.fiestas, {region: $scope.regionFilter});
				$scope.fiestas = $filter('filter')($scope.fiestas, {startDate: $scope.yearFilter});
				$scope.filteredCount = $scope.fiestas.length;
				if(!$scope.filteredCount) $scope.fiestas = data;
	 		});
		 }

	  /**
		 * Reset the commodity filter
		 **/
		 $scope.emptyCommodityFilter = function() {
			 $scope.selectComm = [];
		 }

		/**
		 * Add a commodity to the filter
		 * - @param {string} commodity - Commodity to be added
		 **/
		 $scope.addCommodityFilter = function(commodity) {
			 if ($.inArray(commodity, $scope.selectComm) == -1) {
			 	$scope.selectComm.push(commodity);
			 }
		 }

		 /**
 		 * Rmove a commodity to the filter
 		 * - @param {string} commodity - Commodity to be removed
 		 **/
		 $scope.removeCommodityFilter = function(commodity) {
			 $scope.selectComm.splice($scope.selectComm.indexOf(commodity), 1);
		 }

		 /**
 		 * Scrolls page on top of FIESTA list when clicked a page
 		 **/
		 $scope.scrollFiesta = function() {
			 $( 'html, body').animate({
				 scrollTop: $('.fiesta-list').offset().top - 90
			 }, 300);
		 }

		 $scope.FocusFiesta = function(id) {
			 $location.path('/fiesta/'+id);
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
