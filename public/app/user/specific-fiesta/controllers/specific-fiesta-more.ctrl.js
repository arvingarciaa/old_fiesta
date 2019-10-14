/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaMoreCtrl", SFiestaMoreCtrl);

	SFiestaMoreCtrl.$inject = ["$scope", "$location", "$filter", "$routeParams", "FiestaSrvc"];

	function SFiestaMoreCtrl($scope, $location, $filter, $routeParams, FiestaSrvc) {
  }
})();
