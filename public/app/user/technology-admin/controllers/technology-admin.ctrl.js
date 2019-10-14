"use strict";

(() => {
	angular.module("app")
		     .controller("TechnologyAdminCtrl", TechnologyAdminCtrl);

	TechnologyAdminCtrl.$inject = ["$scope", "$filter", "$cookies", "$location", "TechnologySrvc","UtilsSrvc"];

	function TechnologyAdminCtrl($scope, $filter, $cookies, $location, TechnologySrvc, UtilsSrvc) {
		angular.element('title')[0].innerHTML = 'Admin | Manage Technologies';
		$scope.techs;
		$scope.list = {};
		$scope.slider;
		$scope.requests;
		$scope.requestCurrentPage = 1;
		$scope.requestPageSize = 20;
		$scope.loggedIn = false;

		if($cookies.get('user')) {
			$scope.loggedIn = true;
		}

		$scope.removeImageSlider = function(index) {
			if($scope.sliderImages.length > 1) {
				$scope.sliderImages.splice(index, 1);
				TechnologySrvc.EditCmsSlider('technology', $scope.sliderImages)
				.then(function (data){
					UtilsSrvc.wait(500, function () {
						UtilsSrvc.ToastSuccess('Deleted image!');
					});
				});
			} else {
				UtilsSrvc.ToastSuccess('Minimum of 1 image for the slider!');
			}

		}

		$scope.addImageSlider = function() {
			TechnologySrvc.AddSliderPhoto('technology', $scope.slider)
				.then(function (res) {
					$scope.slider = "";
					$scope.sliderImages.push(res.replace('public/',''));
					TechnologySrvc.EditCmsSlider('technology', $scope.sliderImages)
					.then(function (data){
						UtilsSrvc.wait(500, function () {
							UtilsSrvc.ToastSuccess('Added image!');
						});
					});
				})
		}

		$scope.changeStatus = function(req, status) {
			if(status == 'Approved') window.location.href = "mailto:"+req.email;
			req.status = status;
			TechnologySrvc.ChangeReqStatus(req._id, req)
			.then(function(data){
				UtilsSrvc.ToastSuccess('Request ' + status +'!');
			});
		}

		TechnologySrvc.GetAll()
		.then(function(data){
			$scope.techs = data;
		});

		TechnologySrvc.GetOneCms('technology')
		.then(function(data){
			$scope.header = data[0].header;
			$scope.sliderImages = data[0].slider;
			$scope.list.sort = data[0].sort;
			$scope.list.filter = data[0].filter;
			$scope.list.counter = data[0].counter;
			$scope.list.cards = data[0].cards;
			$scope.list.pagination = data[0].pagination;
			$scope.list.pagination.pageSize = data[0].pagination.pageSize.toString();
			$scope.list.cards.order = data[0].cards.order == false? 'Ascending':'Descending';
		});

		TechnologySrvc.GetRequests()
		.then(function(data){
			$scope.requests = $filter('orderBy')(data, '', true);
		});

		$scope.UpdateHeader = function() {
			$scope.headerLoading = true;
			TechnologySrvc.EditCmsHeader('technology', $scope.header)
			.then(function(data){
				UtilsSrvc.wait(500, function () {
					$scope.headerLoading = false;
					UtilsSrvc.ToastSuccess('Updated header!');
				});
			});
		}

		$scope.UpdateList = function() {
			let page = parseInt($scope.list.pagination.pageSize);
			let ordercards;
			if($scope.list.cards.order == 'Ascending'){
				ordercards = false;
			} else {
				ordercards = true;
			}

			if(!$scope.list.sort.options.title &&
				 !$scope.list.sort.options.industry &&
				 !$scope.list.sort.options.year &&
			 	 !$scope.list.sort.options.commodity)
				 $scope.list.sort.show = false;

			if(!$scope.list.filter.options.industry &&
				 !$scope.list.filter.options.year &&
				 !$scope.list.filter.options.commodity)
				 $scope.list.filter.show = false;

			let data = {
				sort: {
					show: $scope.list.sort.show,
					options: {
						title: $scope.list.sort.options.title,
						industry: $scope.list.sort.options.industry,
						year: $scope.list.sort.options.year,
						commodity: $scope.list.sort.options.commodity,
					}
				},
				filter: {
					show: $scope.list.filter.show,
					options: {
						industry: $scope.list.filter.options.industry,
						year: $scope.list.filter.options.year,
						commodity: $scope.list.filter.options.commodity
					}
				},
				counter: $scope.list.counter,
				cards: {
					option: $scope.list.cards.option,
					order: ordercards
				},
				pagination: {
					pageSize: page,
					currentPage: $scope.list.pagination.currentPage
				}
			}

			$scope.technologyListLoading = true;
			TechnologySrvc.EditCmsList('technology', data)
			.then(function(data){
				UtilsSrvc.wait(500, function () {
					$scope.technologyListLoading = false;
					UtilsSrvc.ToastSuccess('Updated Technology List options!');
				});
			});
			$scope.list.pagination.pageSize = $scope.list.pagination.pageSize.toString();
		};
	}
})();
