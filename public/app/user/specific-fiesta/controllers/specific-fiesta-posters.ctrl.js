/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaPostersCtrl", SFiestaPostersCtrl);

	SFiestaPostersCtrl.$inject = ["$scope", "$routeParams", "FiestaSrvc"];

	function SFiestaPostersCtrl($scope, $routeParams, FiestaSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
		$scope.posters = []; /** {array} all posters of FIESTA */
		$scope.posterActive = 0; /** {int} indicator of active slide in carousel */
		$scope.posterThumbActive = 0; /** {int} indicator of active slide in thumbnails */
		$scope.posterFocus = null; /** {object} selected poster */
		$scope.posterInterval = 5000;

		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Gets all poster of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
    FiestaSrvc.GetAllPoster($routeParams.fiestaId)
     .then(function(data) {
       $scope.posters = data;
    });

		/***************************************************************************
		 @INFO: Scope Functions
		***************************************************************************/
		/**
		 * Sets the active poster on carousel
		 * - @param index - index of the selected poster
		 */
    $scope.SetPosterActive = function(index) {
      $scope.posterActive = index;
    }

		/**
		 * Sets the active poster on click
		 * - @param index - index of the selected poster
		 */
    $scope.SetPosterFocus = function(index) {
      $scope.posterFocus = $scope.posters[index];
      $scope.posterInterval = 0;
    }

    $("#poster-modal").on("hide.bs.modal", function () {
      $scope.posterInterval = 5000;
      $scope.$apply();
    });
  }
})();
