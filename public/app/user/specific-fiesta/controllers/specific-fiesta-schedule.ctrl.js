/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaScheduleCtrl", SFiestaScheduleCtrl);

	SFiestaScheduleCtrl.$inject = ["$scope", "$filter", "$routeParams", "FiestaSrvc"];

	function SFiestaScheduleCtrl($scope, $filter, $routeParams, FiestaSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
		$scope.schedule = []; /** {array} of schedules */
		$scope.dates = [];	/** {array} of dates in the schedule */
		$scope.googleMapApi = 'AIzaSyC8Ma9Y11olmbaqmMO1bfpuz4g_6pK-_3E'; /** {string} google map api */

		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Gets all schedule
		 * - @params $routeParams.fiestaId - FIESTA id
		 */
	 	FiestaSrvc.GetAllActivity($routeParams.fiestaId)
		.then(function(data) {
			$scope.schedule = data;

      let holder = {};
      for (let i = 0; i < $scope.schedule.length; i++) {
        let date = $filter('date')(new Date($scope.schedule[i].timestamp), 'MMMM d, y (EEEE)');
        if(!holder[date]) holder[date] = [];
          holder[date].push($scope.schedule[i]);
      }

      for (let date in holder) {
        if (holder.hasOwnProperty(date)) {
          let x = {name: date, schedule: holder[date]};
          $scope.dates.push(x);
        }
      }
	 });
 }
})();
