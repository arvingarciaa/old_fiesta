/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaAwardsCtrl", SFiestaAwardsCtrl);

	SFiestaAwardsCtrl.$inject = ["$scope", "$routeParams", "FiestaSrvc"];

	function SFiestaAwardsCtrl($scope, $routeParams, FiestaSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
    $scope.awards = []; /** {array} all awards of FIESTA */
    $scope.awardActive = 0; /** {int} indicator of active slide in carousel */
    $scope.awardThumbActive = 0; /** {int} indicator of active slide in thumbnails */
    $scope.awardFocus = null; /** {object} selected award */
    $scope.awardInterval = 5000;

		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Gets all awards of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
    FiestaSrvc.GetAllAward($routeParams.fiestaId)
     .then(function(data) {
       $scope.awards = data;
    });

		/***************************************************************************
		 @INFO: Scope Functions
		***************************************************************************/
		/**
		 * Sets the active award on carousel
		 * - @param index - index of the selected award
		 */
    $scope.SetAwardActive = function(index) {
      $scope.awardActive = index;
    }

		/**
		 * Sets the active award on click
		 * - @param index - index of the selected award
		 */
    $scope.SetAwardFocus = function(index) {
      $scope.awardFocus = $scope.awards[index];
      $scope.awardInterval = 0;
    }

    $("#award-modal").on("hide.bs.modal", function () {
      $scope.awardInterval = 5000;
      $scope.$apply();
    });
  }
})();
