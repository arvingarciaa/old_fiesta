/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaFeatTechCtrl", SFiestaFeatTechCtrl);

	SFiestaFeatTechCtrl.$inject = ["$scope", "$filter", "$timeout", "$cookies", "$routeParams", "FiestaSrvc", "UtilsSrvc"];

	function SFiestaFeatTechCtrl($scope, $filter, $timeout, $cookies, $routeParams, FiestaSrvc, UtilsSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
    $scope.fiesta; /** {object} that contains the selected FIESTA */
		$scope.sectors = []; /** {array} that contains the sectors for feat tech */
		$scope.sec = { 'Aquatic':0, 'Crops':0, 'Forest and Environment':0, 'Livestock':0 } /** {object} that contains all sector count */
    $scope.technologies = []; /** {array} that contains all FIESTA feat tech*/
    $scope.tech = {} /** {object} handler of each tech */
  	$scope.isCollapsed = true; /** {boolean} for dropdown of sectors */
		$scope.isCommCollapsed = true; /** {boolean} for dropdown of commodities */
		$scope.featTechFocus; /** {object} that contains the selected feat tech */
		$scope.type = 'feattech';

		$scope.ftcomments=[];
		$scope.ftcomment={};
		$scope.ftcommentsPage = 1;

		$scope.reactClick = '';
		$scope.likeCount = 0;
		$scope.happyCount = 0;
		$scope.sadCount = 0;

		let initialize = false;
		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Get Specific FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 **/
    FiestaSrvc.GetOne($routeParams.fiestaId)
    .then(function (data) {
      $scope.fiesta = data;
    });

		/**
		 * Get all featured technologies of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 **/
    FiestaSrvc.GetAllTechnology($routeParams.fiestaId)
    .then(function (data) {
      $scope.technologies = data;
      classifyTechnologies(data);
    });

		/**
		 * Sets the initial featured technology featTechFocus
		 **/
		$scope.SetInitialFeatTechFocus = function() {
			let id, id2;
			if($scope.sec['Aquatic']) {
				id = "#sector-A";
				id2= '#'+$('.sector-A>.panel-body>.table>tbody>tr:first').attr('id');
			} else if($scope.sec['Crops']) {
				id = "#sector-C";
				id2= '#'+$('.sector-C>.panel-body>.table>tbody>tr:first').attr('id');
			} else if($scope.sec['Livestock']) {
				id = "#sector-L";
				id2= '#'+$('.sector-L>.panel-body>.table>tbody>tr:first').attr('id');
			} else if ($scope.sec['Forest and Environment']) {
				id = "#sector-F";
				id2= '#'+$('.sector-F>.panel-body>.table>tbody>tr:first').attr('id');
			}

			$timeout(function() {
				if(initialize == false) {
					angular.element(id).trigger('click');
					angular.element(id2+'>td>a').trigger('click');
					angular.element(id2+'>td>.feattechs>.table>tbody>tr:first>td').trigger('click');
					initialize = true;
				}
			}, 100);
		}

		$scope.$watch('featTechFocus', function(newVal, oldVal) {
			if(newVal) {
				$scope.reactClick = '';
				updateReact();

				FiestaSrvc.GetOneComment($routeParams.fiestaId, $scope.type, $scope.featTechFocus._id)
				.then(function(data) {
					$scope.ftcomments = $filter('filter')(data, {approve: true});
					$scope.ftcomments = $filter('orderBy')($scope.ftcomments, 'timestamp', true);
				});

			}
		});

		/***************************************************************************
		 @INFO: Scope Functions
		***************************************************************************/
		/**
		 * Sets the active header focus
		 * - @param option - sector name
		 **/
		$scope.SetFeatTechHeaderFocus = function(option) {
			let id, id2;
			if(option == 'Aquatic' && $scope.sec['Aquatic']) {
				id = "#sector-A";
				id2= '#'+$('.sector-A>.panel-body>.table>tbody>tr:first').attr('id');
			} else if(option == 'Crops' && $scope.sec['Crops']) {
				id = "#sector-C";
				id2= '#'+$('.sector-C>.panel-body>.table>tbody>tr:first').attr('id');
			} else if(option == 'Livestock' && $scope.sec['Livestock']) {
				id = "#sector-L";
				id2= '#'+$('.sector-L>.panel-body>.table>tbody>tr:first').attr('id');
			} else if (option == 'Forest and Environment' && $scope.sec['Forest and Environment']) {
				id = "#sector-F";
				id2= '#'+$('.sector-F>.panel-body>.table>tbody>tr:first').attr('id');
			}

			$timeout(function() {
				angular.element(id).trigger('click');
				angular.element(id2+'>td>a').trigger('click');
				angular.element(id2+'>td>.feattechs>.table>tbody>tr:first>td').trigger('click');
			}, 100);
		}

		/**
		 * Sets feat tech
		 * - @param id - id of feat tech
		 **/
		$scope.SetFeatTechFocus = function(id) {
			$scope.featTechFocus = $filter('filter')($scope.technologies, id)[0];
			$( 'html, body').animate({
					scrollTop: $('body').offset().top
				}, 300);
		}

		/**
		 * Add comments to the selected feat tech
		 **/
		$scope.AddComment = function() {
			if(!$scope.featTechFocus || $scope.featTechFocus._id==''){
				return UtilsSrvc.ToastError('Please select a technology');
			}

			if($scope.ftcomment.comment != ''){
				if(!$scope.ftcomment.username) $scope.ftcomment.username = 'Anonymous';
				let commentData = {
					username: $scope.ftcomment.username,
					type: $scope.type,
					typeId: $scope.featTechFocus._id,
					comment: $scope.ftcomment.comment
				};

				FiestaSrvc.AddComment($routeParams.fiestaId, commentData)
				.then(function(data){
					UtilsSrvc.wait(500, function () {						
						$scope.ftcomment.username = '';
						$scope.ftcomment.comment = '';
						UtilsSrvc.ToastSuccess('Comment Added!');
					});
				});
			}
		}

		/**
		 * Add reaction to the selected feat tech
		 **/
		$scope.AddReact = function(reaction) {
			let data = {
				'type': $scope.type,
        'typeId': $scope.featTechFocus._id,
        'userId': $cookies.get('_ga'),
        'reaction': reaction
			}

			if($scope.reactClick == reaction) {
				switch (reaction) {
					case 'like': $scope.likeCount = $scope.likeCount - 1;
					break;
					case 'happy': $scope.happyCount = $scope.happyCount - 1;
					break;
					case 'sad': $scope.sadCount = $scope.sadCount - 1;
					break;
				}
				updateIcon(reaction, false);
				FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
						data.typeId, data.userId)
				.then(function(data){
					$scope.reactClick = '';
				});
			} else {
				if($scope.reactClick=='') {
					switch (reaction) {
						case 'like': $scope.likeCount = $scope.likeCount + 1;
						break;
						case 'happy': $scope.happyCount = $scope.happyCount + 1;
						break;
						case 'sad': $scope.sadCount = $scope.sadCount + 1;
						break;
					}
					updateIcon(reaction, true);
					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClick = reaction;
					});
				} else {
					switch ($scope.reactClick) {
						case 'like': $scope.likeCount = $scope.likeCount - 1;
						break;
						case 'happy': $scope.happyCount = $scope.happyCount - 1;
						break;
						case 'sad': $scope.sadCount = $scope.sadCount - 1;
						break;
					}
					updateIcon($scope.reactClick, false);
					FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
							data.typeId, data.userId)
					.then(function(data){
						$scope.reactClick = '';
					});

					switch (reaction) {
						case 'like': $scope.likeCount = $scope.likeCount + 1;
						break;
						case 'happy': $scope.happyCount = $scope.happyCount + 1;
						break;
						case 'sad': $scope.sadCount = $scope.sadCount + 1;
						break;
					}
					updateIcon(reaction, true);
					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClick = reaction;
					});
				}
			}
		}

		$scope.deleteFtComment = function(comment){
			if(confirm('Are you sure you want to delete this comment?')) {
				for(var i = 0; i < $scope.ftcomments.length; i++) {
					var obj = $scope.ftcomments[i];
					if(obj && obj._id == comment._id) $scope.ftcomments.splice(i, 1);
				}

				FiestaSrvc.DeleteComment(comment._id)
				.then(function(data){
					UtilsSrvc.ToastSuccess('Comment deleted!');
				});
			}
    }
		/***************************************************************************
		 @INFO: Utility Functions
		***************************************************************************/
		/**
		 * Classifies featured technologies to its sector
		 * - @param technologies - array of featured technologies
		 **/
    function classifyTechnologies (technologies) {
      FiestaSrvc.GetAllSector()
      .then(function (data) {
        $scope.sectors = data;

        for (var i = 0; i < technologies.length; i++) {
          if(!$scope.tech.hasOwnProperty(technologies[i].commodity)) {
            $scope.tech[technologies[i].commodity] = [];
          }
          $scope.tech[technologies[i].commodity].push(technologies[i]);
        }
      });
    }

		function updateReact () {
			$scope.likeCount = $scope.happyCount = $scope.sadCount = 0;

			FiestaSrvc.GetAllReaction($routeParams.fiestaId, $scope.type, $scope.featTechFocus._id)
			.then(function (data) {
				$scope.likeCount = $filter('filter')(data, {reaction: 'like'}).length;
				$scope.happyCount = $filter('filter')(data, {reaction: 'happy'}).length;
				$scope.sadCount = $filter('filter')(data, {reaction: 'sad'}).length;
			});

			checkUser();
		}

		function checkUser () {
			FiestaSrvc.GetOneReaction($routeParams.fiestaId, $scope.type,
					$scope.featTechFocus._id, $cookies.get('_ga'))
			.then(function (data) {
				if(data.reaction) {
					updateIcon(data.reaction, true);
					$scope.reactClick = data.reaction;
				} else {
					updateIcon('', false);
					$scope.reactClick = '';
				}
			});
		}

		function updateIcon (reaction, inverse) {
				$('.fa-thumbs-up').addClass('fa-thumbs-o-up');
				$('.fa-thumbs-o-up').removeClass('fa-thumbs-up');
				$('.fa-thumbs-o-up').css('color', '#000000')
				$('.fa-smile-o').removeClass('selected');
				$('.fa-frown-o').removeClass('selected')
			 if(inverse) {
				switch(reaction) {
					case 'like':
						$('.fa-thumbs-o-up').addClass('fa-thumbs-up');
						$('.fa-thumbs-up').removeClass('fa-thumbs-o-up');
						$('.fa-thumbs-up').css('color', '#3062b7')
							break;
					case 'happy':
						$('.fa-smile-o').addClass('selected');
							break;
					case 'sad':
						$('.fa-frown-o').addClass('selected');
						break;
				}
			}
		}
  }
})();
