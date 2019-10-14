"use strict";

(() => {
	angular.module("app")
					.controller("AdminCtrl", AdminCtrl);

	AdminCtrl.$inject = ["$scope", "$location", "$routeParams", "FiestaSrvc", "AuthSrvc", "$http"];

	function AdminCtrl($scope, $location, $routeParams, FiestaSrvc, AuthSrvc, $http) {
		$scope.loggedIn = AuthSrvc.IsLoggedIn(true);
		if($scope.loggedIn) {
			$scope.name = AuthSrvc.GetAdmin().name;
		}

		$scope.goTo = function (url) {
			$location.url(url);
		};

		if(AuthSrvc.IsLoggedIn()){
			$scope.isAdmin = (AuthSrvc.GetAdmin().isAdmin) || false;
			switch ($location.$$url) {
				case '/admin/':
					angular.element('title')[0].innerHTML = 'Admin | Manage Fiestas';
					$scope.activeJustified = 0;
					$scope.tabTemplateUrl = 'app/admin/directives/manage-fiesta/manage-fiesta.view.ejs';
					break;
				case '/admin/customize':
					angular.element('title')[0].innerHTML = 'Admin | Customize';
					$scope.activeJustified = 1;
					$scope.tabTemplateUrl = 'app/admin/directives/customize/customize.view.ejs';
					break;
				case '/admin/analytics':
					angular.element('title')[0].innerHTML = 'Admin | Analytics';
					$scope.activeJustified = 2;
					$scope.tabTemplateUrl = 'app/admin/directives/analytics/analytics.view.ejs';
					break;
				case '/admin/comments':
					angular.element('title')[0].innerHTML = 'Admin | Manage Comments';
					$scope.activeJustified = 3;
					$scope.tabTemplateUrl = 'app/admin/directives/manage-comments/manage-comments.view.ejs';
					break;
				case '/admin/accounts':
					angular.element('title')[0].innerHTML = 'Admin | Manage Accounts';
					$scope.activeJustified = 4;
					$scope.tabTemplateUrl = 'app/admin/directives/manage-account/manage-account.view.ejs';
					break;
			}

			$scope.setTabContent = function(slug) {
				$location.path('admin/'+slug);
			};
		}
	}
})();
