"use strict";

(() => {
	angular.module("app")
		     .controller("TechnologyCtrl", TechnologyCtrl);

	TechnologyCtrl.$inject = ["$scope", "$filter", "$cookies", "$location", "TechnologySrvc","UtilsSrvc"];

	function TechnologyCtrl($scope, $filter, $cookies, $location, TechnologySrvc, UtilsSrvc) {
		$scope.techs;
		$scope.tech_cms;
		$scope.tech_focus;
		$scope.filtered_techs;
		$scope.filtered_techs_search;
		$scope.reverse = {};

		$scope.techCurrPage = 1;
		$scope.pagination = {techCurrPage:  1};
		$scope.techPageSize = 12;
		$scope.filteredCount = 0;
		$scope.industries = [];
		$scope.years = [];
		$scope.commodities = [];
		$scope.commoditiesFilter = [];
		$scope.industryFilter = '';
		$scope.yearFilter = '';
		$scope.selectComm = [];
		$scope.key;
		$scope.isSearch = false;
		$scope.userEmail = '';

		TechnologySrvc.GetOneCms('technology')
		.then(function(data){
			$scope.tech_cms = data[0];
		});

		TechnologySrvc.GetAll()
		.then(function(data){
			$scope.techs = data;
			$scope.filtered_techs = $filter('orderBy')(data, 'title', false);
			$scope.filteredCount = data.length;

			angular.forEach($scope.techs, function(value, index){
				if(value.commodity) {
					value.commodity = value.commodity.toString();
					$scope.techs[index].picture = '/assets/user/images/technology/'+$filter('lowercase')(value.commodity.replace(/[\s()]/g, '')) + '.jpg';
				}
				if(Array.isArray(value.industries)) {
					$scope.techs[index].industrySort = value.industries[0];
					angular.forEach(value.industries, function(i, k) {
						if($.inArray(i, $scope.industries) == -1 && i != '') {
							$scope.industries.push(i);
						}
					});
				}
				if ($.inArray(value.year, $scope.years) == -1 && value.year != '') {
					$scope.years.push(value.year);
				}
				if(Array.isArray(value.commodities)) {
					$scope.techs[index].commoditySort = value.commodities[0];
					angular.forEach(value.commodities, function(c, k) {
						if($.inArray(c, $scope.commodities) == -1 && c != '') {
							$scope.commodities.push(c);
						}
					})
				}
			});
		});

		$scope.filter = function(type, option) {
			switch(type) {
				case 'industry': $scope.industryFilter = option; break;
				case 'year': $scope.yearFilter = option; break;
				case 'commodities': $scope.commoditiesFilter = option; break;
			}
			if(!$scope.isSearch) {
				$scope.filtered_techs = $scope.techs;
			} else {
				$scope.filtered_techs = $scope.filtered_techs_search;
			}

			let techList = [];
			if($scope.commoditiesFilter.length > 0) {
				angular.forEach($scope.filtered_techs, function(value, index){
					if(value.commodity && findOne(value.commodity, $scope.commoditiesFilter)){
						techList.push(value);
					}
				});
				$scope.filtered_techs = $filter('filter')(techList, {industry: $scope.industryFilter});
			} else {
				$scope.filtered_techs = $filter('filter')($scope.filtered_techs, {industry: $scope.industryFilter});
			}
			$scope.filtered_techs = $filter('filter')($scope.filtered_techs, {year: $scope.yearFilter});
			$scope.filteredCount = $scope.filtered_techs.length;
		}

		$scope.sort = function (option, reverseOption) {
			if(angular.element('#'+option).hasClass('bold')){
				$scope.reverse[option] = !$scope.reverse[option];
				reverseOption = $scope.reverse[option];
			} else{
				angular.element('.tools').removeClass('bold');
				angular.element('.tools').removeClass('black');
				angular.element('#'+option).addClass('bold');
				angular.element('#'+option).addClass('black');
			}
			 $scope.filtered_techs = $filter('orderBy')($scope.filtered_techs, option, $scope.reverse[option]);
		};

		 $scope.emptyCommodityFilter = function() {
			 $scope.selectComm = [];
		 }

		$scope.addCommodityFilter = function(commodity) {
			if ($.inArray(commodity, $scope.selectComm) == -1) {
			 $scope.selectComm.push(commodity);
			}
		}

		$scope.removeCommodityFilter = function(commodity) {
			$scope.selectComm.splice($scope.selectComm.indexOf(commodity), 1);
		}


		$scope.FocusTech = function(id) {
			window.location = 'http://technology-dashboard.herokuapp.com/#/technology/'+id;
		}

		function findOne(haystack, arr) {
			return arr.some(function (v) {
					return haystack.indexOf(v) >= 0;
				});
		}

		$scope.request = function(id) {
			$scope.requestFocus = $filter('filter')($scope.techs, {_id: id})[0];
		}

		$scope.getInfo = function(id) {
			$scope.tech_focus = $filter('filter')($scope.techs, {_id: id})[0];
		}

		$scope.requestSubmit = function() {
			// send email ask what email to use;
			TechnologySrvc.StoreRequest($scope.requestFocus, $scope.userEmail)
			.then(function(data){
				UtilsSrvc.ToastSuccess('Request added!');
				$scope.userEmail = '';
			});
		}

    $scope.search = function(key){
			if(key){
				TechnologySrvc.Search(key)
				.then(function(data){
					$scope.filtered_techs = {};
					$scope.filtered_techs = $filter('orderBy')(data, 'title', false);
					$scope.filtered_techs_search = $filter('orderBy')(data, 'title', false);
					$scope.filteredCount = $scope.filtered_techs.length;

					$scope.industries = [];
					$scope.sectors = [];
					$scope.years = [];
					$scope.commodities = [];
					$scope.commoditiesFilter = [];
					$scope.industryFilter = '';
					$scope.yearFilter = '';
					$scope.selectComm = [];
					angular.forEach($scope.filtered_techs, function(value, index){
						if(value.commodity) {
							value.commodity = value.commodity.toString();
							$scope.filtered_techs[index].picture = $scope.filtered_techs_search[index].picture = '/assets/user/images/technology/'+$filter('lowercase')(value.commodity.replace(/[\s()]/g, '')) + '.jpg';
						}
						if(Array.isArray(value.industries)) {
							$scope.filtered_techs[index].industrySort = value.industries[0];
							angular.forEach(value.industries, function(i, k) {
								if($.inArray(i, $scope.industries) == -1 && i != '') {
									$scope.industries.push(i);
								}
							});
						}
						if ($.inArray(value.year, $scope.years) == -1 && value.year != '') {
							$scope.years.push(value.year);
						}
						if(Array.isArray(value.commodities)) {
							$scope.filtered_techs[index].commoditySort = value.commodities[0];
							angular.forEach(value.commodities, function(c, k) {
								if($.inArray(c, $scope.commodities) == -1 && c != '') {
									$scope.commodities.push(c);
								}
							})
						}
						$scope.isSearch = true;
					});
				});
			} else {
				$scope.isSearch = false;
				$scope.filtered_techs = $filter('orderBy')($scope.techs, 'title', false);
				$scope.filteredCount = $scope.filtered_techs.length;

				$scope.industries = [];
				$scope.sectors = [];
				$scope.years = [];
				$scope.commodities = [];
				$scope.commoditiesFilter = [];
				$scope.industryFilter = '';
				$scope.yearFilter = '';
				$scope.selectComm = [];
				angular.forEach($scope.filtered_techs, function(value, index){
					if(value.commodity) {
						value.commodity = value.commodity.toString();
						$scope.filtered_techs[index].picture = '/assets/user/images/technology/'+$filter('lowercase')(value.commodity.replace(/[\s()]/g, '')) + '.jpg';
					}
					if(Array.isArray(value.industries)) {
						$scope.filtered_techs[index].industrySort = value.industries[0];
						angular.forEach(value.industries, function(i, k) {
							if($.inArray(i, $scope.industries) == -1 && i != '') {
								$scope.industries.push(i);
							}
						});
					}
					if ($.inArray(value.year, $scope.years) == -1 && value.year != '') {
						$scope.years.push(value.year);
					}
					if(Array.isArray(value.commodities)) {
						$scope.filtered_techs[index].commoditySort = value.commodities[0];
						angular.forEach(value.commodities, function(c, k) {
							if($.inArray(c, $scope.commodities) == -1 && c != '') {
								$scope.commodities.push(c);
							}
						})
					}
				});

			}
    }

		$scope.isArray = function(obj){
			return angular.isArray(obj);
		}

		$scope.isObject = function(obj) {
			if( (typeof obj === "object") && (obj !== null) ) return true;
			return false;
		}

		$scope.countObject = function(arr) {
			let cnt = 0;
			angular.forEach(arr, function(v, k){
				if( (typeof v === "object") && (v !== null) ) cnt++;
			});
			return cnt;
		}
	}
})();
