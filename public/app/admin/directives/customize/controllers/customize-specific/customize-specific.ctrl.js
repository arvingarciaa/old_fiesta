(() => {
	angular.module("app")
		     .controller("SCustomizeCtrl", SCustomizeCtrl);

	SCustomizeCtrl.$inject = ["$scope", "$routeParams", "FiestaSrvc", "UtilsSrvc"];

	function SCustomizeCtrl($scope, $routeParams, FiestaSrvc, UtilsSrvc) {
		$scope.fiestas = []
	  $scope.page_cms = {};
		$scope.page_name = '';

		if($routeParams.page == 'fiesta') {
			FiestaSrvc.GetAll()
			.then(function(data){
				$scope.fiestas = data;
			});

			$scope.page_name = 'FIESTA'
			$scope.carousel = {
				selected: {}
			}
			$scope.choose = 'choose';

	    FiestaSrvc.GetOneCms('fiesta')
	    .then(function(data){
	      $scope.page_cms = data[0];
				// Banner
				$scope.banner = $scope.page_cms.banner;
				// Logo
				$scope.logo = $scope.page_cms.logo;
				// Carousel Default
				$scope.carouselimage = $scope.page_cms.carousel.default;
				// Carousel Fiesta
				angular.forEach($scope.page_cms.carousel.fiesta, function(value, index){
					$scope.carousel.selected[value] = '';
					$scope.carousel.selected[value] = value;
				});
				// Header
				$scope.header = $scope.page_cms.header;
				// Tagline
				$scope.tagline = $scope.page_cms.tagline;
				// Lists
				$scope.list = {
					sort: {
				    show: $scope.page_cms.sort.show,
				    options: {
				      title: $scope.page_cms.sort.options.title,
				      date: $scope.page_cms.sort.options.date,
				      consortium: $scope.page_cms.sort.options.consortium
				    }
				  },
				  filter: {
				    show: $scope.page_cms.filter.show,
				    options: {
				      consortium: $scope.page_cms.filter.options.consortium,
				      region: $scope.page_cms.filter.options.region,
				      year: $scope.page_cms.filter.options.year,
				      commodity: $scope.page_cms.filter.options.commodity
				    }
				  },
				  counter: $scope.page_cms.counter,
				  cards: {
				    option: $scope.page_cms.cards.option,
				    order: $scope.page_cms.cards.order == true? 'Ascending':'Descending'
				  },
				  pagination: {
				    pageSize: $scope.page_cms.pagination.pageSize.toString(),
				    currentPage: $scope.page_cms.pagination.currentPage
				  }
				}
				// Magazine
				$scope.mag = {
					show: $scope.page_cms.pdf.show,
					sortoption: $scope.page_cms.pdf.sort.option,
					sortorder: $scope.page_cms.pdf.sort.order == false? 'Ascending': 'Descending'
				};
	    });

			$scope.UpdateHeader = function() {
				$scope.headerLoading = true;
				FiestaSrvc.EditCmsHeader($scope.page_cms.page, $scope.header)
				.then(function(data){
					UtilsSrvc.wait(500, function () {
						$scope.headerLoading = false;
						UtilsSrvc.ToastSuccess('Updated header!');
					});
				});
			}

			$scope.UpdateTagline = function() {
				$scope.taglineLoading = true;
				FiestaSrvc.EditCmsTagline($scope.page_cms.page, $scope.tagline)
				.then(function(data){
					UtilsSrvc.wait(500, function () {
						$scope.taglineLoading = false;
						UtilsSrvc.ToastSuccess('Updated tagline!');
					});
				});
			}

			$scope.UpdateBanner = function() {
				if(!$scope.banner){
	        UtilsSrvc.ToastError('No photo uploaded!');
	        return;
	      }
				$scope.bannerLoading = true;
	      FiestaSrvc.EditCmsBanner($scope.page_cms.page, $scope.banner)
	        .then(function (data) {
	          UtilsSrvc.wait(1500, function () {
							$scope.bannerLoading = false;
	            $scope.banner = data.banner;
	            UtilsSrvc.ToastSuccess('Updated banner!');
	          });
	        })
	        .catch(function (err) {
						$scope.bannerLoading = false;
	          UtilsSrvc.ToastError(err.toString());
	        });
	    };




			$scope.UpdateCarouselImage = function() {
				if(!$scope.carouselimage){
	        UtilsSrvc.ToastError('No photo uploaded!');
	        return;
	      }
				$scope.carouseldefLoading = true;
	      FiestaSrvc.EditCmscCarouselImage($scope.page_cms.page, $scope.carouselimage)
	        .then(function (data) {
	          UtilsSrvc.wait(1500, function () {
							$scope.carouseldefLoading = false;
	            $scope.carouselimage = data.carousel.default;
	            UtilsSrvc.ToastSuccess('Updated carousel default image!');
	          });
	        })
	        .catch(function (err) {
						$scope.carouseldefLoading = false;
	          UtilsSrvc.ToastError(err);
	        });
	    };

			$scope.UpdateCarouselFeature = function() {
				$scope.dataCarousel = [];
				if($scope.choose == 'choose') {
					for (let prop in $scope.carousel.selected) {
						if($scope.carousel.selected.hasOwnProperty(prop)) {
						$scope.dataCarousel.push($scope.carousel.selected[prop]);
	    			}
					}
					$scope.carouselfeatLoading = true;
					FiestaSrvc.EditCmsCarouselFeature($scope.page_cms.page, $scope.dataCarousel)
					.then(function(data){
						UtilsSrvc.wait(1500, function () {
							$scope.carouselfeatLoading = false;
							UtilsSrvc.ToastSuccess('Updated Featured FIESTA in Carousel!');
	          });
					});
				} else {
					FiestaSrvc.GetLatest(5).
					then(function(data){
						angular.forEach(data, function(value, index){
							$scope.dataCarousel.push(value._id);
						});
						$scope.carouselfeatLoading = true;
						FiestaSrvc.EditCmsCarouselFeature($scope.page_cms.page, $scope.dataCarousel)
						.then(function(data){
							UtilsSrvc.wait(1500, function () {
								$scope.carouselfeatLoading = false;
								UtilsSrvc.ToastSuccess('Updated Featured FIESTA in Carousel!');
		          });
						});
					});
				}
		  }

			$scope.UpdateLogo = function() {
				if(!$scope.logo){
	        UtilsSrvc.ToastError('No photo uploaded!');
	        return;
	      }
				$scope.logoLoading = true;
	      FiestaSrvc.EditCmsLogo($scope.page_cms.page, $scope.logo)
	        .then(function (data) {
	          UtilsSrvc.wait(1500, function () {
							$scope.logoLoading = false;
	            $scope.logo = data.logo;
	            UtilsSrvc.ToastSuccess('Updated logo!');
	          });
	        })
	        .catch(function (err) {
						$scope.logoLoading = false;
	          UtilsSrvc.ToastError(err.toString());
	        });
	    };

			$scope.UpdateList = function() {
				let page = parseInt($scope.list.pagination.pageSize);
				let ordercards;
				if($scope.list.cards.order == 'Ascending'){
					ordercards = false;
				} else {
					ordercards = true;
				}

				if(!$scope.list.sort.options.title &&
					 !$scope.list.sort.options.date  &&
					 !$scope.list.sort.options.consortium)
					 $scope.list.sort.show = false;

				if(!$scope.list.filter.options.consortium &&
					 !$scope.list.filter.options.region &&
				 	 !$scope.list.filter.options.year &&
				   !$scope.list.filter.options.commodity)
					 $scope.list.filter.show = false;

				let data = {
					sort: {
				    show: $scope.list.sort.show,
				    options: {
				      title: $scope.list.sort.options.title,
				      date: $scope.list.sort.options.date,
				      consortium: $scope.list.sort.options.consortium
				    }
				  },
				  filter: {
				    show: $scope.list.filter.show,
				    options: {
				      consortium: $scope.list.filter.options.consortium,
				      region: $scope.list.filter.options.region,
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
				    currentPage: $scope.page_cms.pagination.currentPage
				  }
				}

				$scope.fiestalistLoading = true;
				FiestaSrvc.EditCmsList($scope.page_cms.page, data)
				.then(function(data){
					UtilsSrvc.wait(500, function () {
						$scope.fiestalistLoading = false;
						UtilsSrvc.ToastSuccess('Updated FIESTA List options!');
					});
				});
				$scope.list.pagination.pageSize = $scope.list.pagination.pageSize.toString();
			};

			$scope.UpdateMagazine = function(){
				let data = {
					pdf: {
						show: $scope.mag.show,
						sort: {
							option: $scope.mag.sortoption,
							order: $scope.mag.sortorder
						}
					}
				}
				$scope.fiestamagLoading = true;
				FiestaSrvc.EditCmsMagazine($scope.page_cms.page, $scope.mag)
				.then(function(data){
					UtilsSrvc.wait(500, function () {
						$scope.fiestamagLoading = false;
						UtilsSrvc.ToastSuccess('Updated FIESTA Magazine options!');
					});
				});
			}
		} else {
			FiestaSrvc.GetOneCms($routeParams.page)
	    .then(function(data){
				$scope.page_cms = data[0];
				FiestaSrvc.GetOne(data[0].page)
				.then(function(fiesta){
					$scope.page_name = fiesta.title;
				});
				FiestaSrvc.GetAllPhoto(data[0].page)
				.then(function(photo){
					$scope.photos = photo;
				});
				FiestaSrvc.GetAllVideo(data[0].page)
				.then(function(video){
					$scope.videos = video;
				});

				$scope.execdirname = $scope.page_cms.fiesta.execdir.director;
				$scope.execdirmessage = $scope.page_cms.fiesta.execdir.message;
				$scope.execdirimage = $scope.page_cms.fiesta.execdir.default;
				$scope.fiestadownload = $scope.page_cms.fiesta.execdir.download;
				$scope.fiestaabout = $scope.page_cms.fiesta.about;
				$scope.fiestareact = $scope.page_cms.fiesta.react;
				$scope.fiestacomment = $scope.page_cms.fiesta.comment;
				$scope.fiestasched =  $scope.page_cms.schedule.sched;
				$scope.fiestavmap = $scope.page_cms.schedule.map;
				$scope.fiestagmap = $scope.page_cms.schedule.googlemap;
				$scope.ftreact = $scope.page_cms.feattech.react;
				$scope.ftcomment = $scope.page_cms.feattech.comment;
				$scope.mediaphoto = $scope.page_cms.media.photo.toString();
				$scope.mediavideo = $scope.page_cms.media.video.toString();
			});

			$scope.UpdateExecDir = function(type) {
				let data = {
					fiesta: {
						execdir: {
							default: $scope.execdirimage,
							director: $scope.execdirname,
							message: $scope.execdirmessage,
							download: $scope.fiestadownload
						},
						about: $scope.fiestaabout,
						react: $scope.fiestareact,
						comment: $scope.fiestacomment
					}
				}

				if(type == 'execdirname') $scope.execdirnameLoading = true;
				else if(type == 'execdirmessage') $scope.execdirmessageLoading = true;
				else if(type == 'fiestaoptions') $scope.fiestaoptionsLoading = true;
				FiestaSrvc.EditCMSFiestaTab($scope.page_cms.page, data)
				.then(function(edname){
					UtilsSrvc.wait(500, function () {
						if(type == 'execdirname'){
							 $scope.execdirnameLoading = false;
							 UtilsSrvc.ToastSuccess("Updated Executive Director's Name!");
						}
						else if(type == 'execdirmessage') {
							$scope.execdirmessageLoading = false;
							UtilsSrvc.ToastSuccess("Updated Executive Director's Message!");
						}
						else if(type == 'fiestaoptions') {
							$scope.fiestaoptionsLoading = false;
							UtilsSrvc.ToastSuccess("Updated FIESTA options!");
						}
					});
				});
			}

			$scope.UpdateExecDirImage = function() {
				if(!$scope.execdirimage){
	        UtilsSrvc.ToastError('No photo uploaded!');
	        return;
	      }

				let data = {
					fiesta: {
						execdir: {
							default: $scope.execdirimage,
							director: $scope.execdirname,
							message: $scope.execdirmessage,
							download: $scope.fiestadownload
						},
						about: $scope.fiestaabout,
						react: $scope.fiestareact,
						comment: $scope.fiestacomment
					}
				}

				$scope.execdirimageLoading = true;
				FiestaSrvc.EditExecDirImage($scope.page_cms.page, data)
	        .then(function (data) {
	          UtilsSrvc.wait(1500, function () {
							$scope.execdirimageLoading = false;
	            $scope.execdirimage = data.fiesta.execdir.default;
	            UtilsSrvc.ToastSuccess("Updated Executive Director's Image!");
	          });
	        })
	        .catch(function (err) {
						$scope.execdirimageLoading = false;
	          UtilsSrvc.ToastError(err.toString());
	        });
	    };

			$scope.UpdateSched = function() {
				let data = {
					schedule: {
						sched: $scope.fiestasched,
						map: $scope.fiestavmap,
						googlemap: $scope.fiestagmap
					}
				}

 			 $scope.schedoptionsLoading = true;
				FiestaSrvc.EditSchedOptions($scope.page_cms.page, data)
				.then(function(res){
					UtilsSrvc.wait(500, function () {
						$scope.schedoptionsLoading = false;
						UtilsSrvc.ToastSuccess("Updated Schedule options!");
					});
				});
			}

			$scope.UpdateFeattech = function() {
				let data = {
					feattech: {
						react: $scope.ftreact,
						comment: $scope.ftcomment
					}
				}

			 $scope.ftoptionsLoading = true;
				FiestaSrvc.EditFtOptions($scope.page_cms.page, data)
				.then(function(res){
					UtilsSrvc.wait(500, function () {
						$scope.ftoptionsLoading = false;
						UtilsSrvc.ToastSuccess("Updated Featured Technology options!");
					});
				});
			}

			$scope.UpdateMedia = function() {
				let data = {
					media: {
						photo: parseInt($scope.mediaphoto),
						video: parseInt($scope.mediavideo)
					}
				}

			 $scope.mediaoptionsLoading = true;
				FiestaSrvc.EditMediaOptions($scope.page_cms.page, data)
				.then(function(res){
					UtilsSrvc.wait(500, function () {
						$scope.mediaoptionsLoading = false;
						UtilsSrvc.ToastSuccess("Updated Media options!");
					});
				});
			}

		}
	}
})();
