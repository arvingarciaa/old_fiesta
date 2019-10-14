/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaMediaCtrl", SFiestaMediaCtrl);

	SFiestaMediaCtrl.$inject = ["$scope", "$location", "$filter", "$cookies", "$routeParams", "FiestaSrvc", "UtilsSrvc"];

	function SFiestaMediaCtrl($scope, $location, $filter, $cookies, $routeParams, FiestaSrvc, UtilsSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
	 	$scope.photos = []; /** {array} FIESTA photos */
	 	$scope.videos = []; /** {array} FIESTA videos */
		$scope.photosPage = 1; /** {int} current page of photos */
		$scope.videosPage = 1; /** {int} current page of videos */
	 	$scope.mediaActive = 0; /** {int} index of active media */
	 	$scope.mediaCount = 0; /** {int} total number of category chosen */
	 	$scope.mediaFocus = null; /** {object} media selected */
		$scope.mediaType = '';
		$scope.type = 'photo';
		$scope.photocomments=[];
		$scope.photocomment={};
		$scope.photocommentsPage = 1;

		$scope.reactClickMedia = '';
		$scope.likeCountPhoto = 0;
		$scope.happyCountPhoto = 0;
		$scope.sadCountPhoto = 0;


		/***************************************************************************
		@INFO: Initialization
		***************************************************************************/
		/**
		 * Get all FIESTA photos
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
		FiestaSrvc.GetAllPhoto($routeParams.fiestaId)
		 .then(function(data) {
			 $scope.photos = $filter('orderBy')(data, 'timestamp', false);
			 if($scope.sfiesta_cms.media.photo == 12 || $scope.sfiesta_cms.media.photo == 24 || $scope.sfiesta_cms.media.photo == 26)
	 			$scope.photosPageSize = $scope.sfiesta_cms.media.photo;
	 		else $scope.photosPageSize = $scope.photos.length;
		});

		/**
		 * Get all FIESTA videos
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
		FiestaSrvc.GetAllVideo($routeParams.fiestaId)
			.then(function(data) {
				$scope.videos = data;
				if($scope.sfiesta_cms.media.video == 12 || $scope.sfiesta_cms.media.video == 24 || $scope.sfiesta_cms.media.video == 26)
 	 				$scope.videosPageSize = $scope.sfiesta_cms.media.video;
 	 			else $scope.videosPageSize = $scope.videos.length;
		});

		/***************************************************************************
		 @INFO: Scope Functions
		***************************************************************************/
		/**
		 * Sets the Media to be focused on modal
		 * - @param type - type of media selected
		 * - @param index - index of the media selected
		 */
		$scope.SetMediaFocus = function(type, index) {
			$scope.mediaType = type;

			if(type === 'photo'){
				$scope.mediaActive = ($scope.photosPage-1)*$scope.photosPageSize+index;
				$scope.mediaCount = $scope.photos.length;
				$scope.mediaFocus = $scope.photos[($scope.photosPage-1)*$scope.photosPageSize+index];
			} else if(type === 'photo-next') {
				$scope.mediaActive = index;
				$scope.mediaCount = $scope.photos.length;
				$scope.mediaFocus = $scope.photos[index];
			} else if(type === 'video') {
				$scope.mediaActive = ($scope.videosPage-1)*$scope.videosPageSize+index;
				$scope.mediaCount = $scope.videos.length;
				$scope.mediaFocus = $scope.videos[($scope.videosPage-1)*$scope.videosPageSize+index];

				FiestaSrvc.GetYoutubeData($scope.mediaFocus.youtubeId)
					.then(function (youtubeData) {
						$scope.mediaFocus.title = youtubeData.items[0].snippet.title;
						$scope.mediaFocus.description = youtubeData.items[0].snippet.description;
					});
			} else if(type === 'video-next') {
				$scope.mediaActive = index;
				$scope.mediaCount = $scope.videos.length;
				$scope.mediaFocus = $scope.videos[index];

				FiestaSrvc.GetYoutubeData($scope.mediaFocus.youtubeId)
					.then(function (youtubeData) {
						$scope.mediaFocus.title = youtubeData.items[0].snippet.title;
						$scope.mediaFocus.description = youtubeData.items[0].snippet.description;
					});
			}

			FiestaSrvc.GetOneComment($routeParams.fiestaId, $scope.type, $scope.mediaFocus._id)
			.then(function(data) {
				$scope.photocomments = $filter('filter')(data, {approve: true});
				$scope.photocomments = $filter('orderBy')($scope.photocomments, 'timestamp', true);
			});

			$scope.reactClickMedia = '';
			updateReact();
		}

		$scope.AddComment = function() {
		 if($scope.photocomment.comment != ''){
			 if(!$scope.photocomment.username) $scope.photocomment.username = 'Anonymous';

			 let commentData = {
				 username: $scope.photocomment.username,
				 type: $scope.type,
				 typeId: $scope.mediaFocus._id,
				 comment: $scope.photocomment.comment
			 };

			 FiestaSrvc.AddComment($routeParams.fiestaId, commentData)
			 .then(function(data){
				 UtilsSrvc.wait(500, function () {
					 $scope.photocomment.username = '';
					 $scope.photocomment.comment = '';
					 UtilsSrvc.ToastSuccess('Comment Added!');
				 });
			 });
		 }
		}

		$scope.AddReactMedia = function(reaction) {
			let data = {
				'type': $scope.type,
        'typeId': $scope.mediaFocus._id,
        'userId': $cookies.get('_ga'),
        'reaction': reaction
			}

			if($scope.reactClickMedia == reaction) {
				switch (reaction) {
					case 'like': $scope.likeCountPhoto = $scope.likeCountPhoto - 1;
					break;
					case 'happy': $scope.happyCountPhoto = $scope.happyCountPhoto - 1;
					break;
					case 'sad': $scope.sadCountPhoto = $scope.sadCountPhoto - 1;
					break;
				}
				updateIcon(reaction, false);
				FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
						data.typeId, data.userId)
				.then(function(data){
					$scope.reactClickMedia = '';
				});
			} else {
				if($scope.reactClickMedia=='') {
					switch (reaction) {
						case 'like': $scope.likeCountPhoto = $scope.likeCountPhoto + 1;
						break;
						case 'happy': $scope.happyCountPhoto = $scope.happyCountPhoto + 1;
						break;
						case 'sad': $scope.sadCountPhoto = $scope.sadCountPhoto + 1;
						break;
					}
					updateIcon(reaction, true);
					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClickMedia = reaction;
					});
				} else {
					switch ($scope.reactClickMedia) {
						case 'like': $scope.likeCountPhoto = $scope.likeCountPhoto - 1;
						break;
						case 'happy': $scope.happyCountPhoto = $scope.happyCountPhoto - 1;
						break;
						case 'sad': $scope.sadCountPhoto = $scope.sadCountPhoto - 1;
						break;
					}
					updateIcon($scope.reactClickMedia, false);
					FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
							data.typeId, data.userId)
					.then(function(data){
						$scope.reactClickMedia = '';
					});

					switch (reaction) {
						case 'like': $scope.likeCountPhoto = $scope.likeCountPhoto + 1;
						break;
						case 'happy': $scope.happyCountPhoto = $scope.happyCountPhoto + 1;
						break;
						case 'sad': $scope.sadCountPhoto = $scope.sadCountPhoto + 1;
						break;
					}
					updateIcon(reaction, true);
					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClickMedia = reaction;
					});
				}
			}
		}

		$scope.getVidDetails = function(id) {
			FiestaSrvc.GetYoutubeData(id)
				.then(function (youtubeData) {
					$scope.hoverYt = youtubeData.items[0].snippet.title;
				});
		}

		$scope.deletePhotoComment = function(comment){
			if(confirm('Are you sure you want to delete this comment?')) {
				for(var i = 0; i < $scope.photocomments.length; i++) {
					var obj = $scope.photocomments[i];
					if(obj && obj._id == comment._id) $scope.photocomments.splice(i, 1);
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
		function updateReact () {
			$scope.likeCountPhoto = $scope.happyCountPhoto = $scope.sadCountPhoto = 0;

			FiestaSrvc.GetAllReaction($routeParams.fiestaId, $scope.type, $scope.mediaFocus._id)
			.then(function (data) {
				$scope.likeCountPhoto = $filter('filter')(data, {reaction: 'like'}).length;
				$scope.happyCountPhoto = $filter('filter')(data, {reaction: 'happy'}).length;
				$scope.sadCountPhoto = $filter('filter')(data, {reaction: 'sad'}).length;
			});

			checkUser();
		}

		function checkUser () {
			FiestaSrvc.GetOneReaction($routeParams.fiestaId, $scope.type,
					$scope.mediaFocus._id, $cookies.get('_ga'))
			.then(function (data) {
				updateIcon(data.reaction, true);
				$scope.reactClickMedia = data.reaction;
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

		$("#video-modal").on("hidden.bs.modal", function () {
  		$scope.mediaFocus = '';
			$scope.$apply();
		});
  }
})();
