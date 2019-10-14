/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaCtrl", SFiestaCtrl);

	SFiestaCtrl.$inject = ["$scope", "$location", "$cookies", "$filter", "$routeParams", "FiestaSrvc", "AuthSrvc", "UtilsSrvc"];

	function SFiestaCtrl($scope, $location, $cookies, $filter, $routeParams, FiestaSrvc, AuthSrvc, UtilsSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
		$scope.tabs = [
			{ slug: '', disable: false, title:'FIESTA', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-fiesta.ejs'},
			{ slug: 'schedule', disable: false, title:'SCHEDULE', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-schedule.ejs'},
			{ slug: 'feattech', disable: false, title:'FEATURED TECHNOLOGIES', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-feattech.ejs'},
			{ slug: 'posters', disable: false, title:'POSTERS', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-posters.ejs'},
			{ slug: 'awards', disable: false, title:'AWARDS', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-awards.ejs'},
			{ slug: 'media', disable: false, title:'MEDIA', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-media.ejs'},
			{ slug: 'blogs', disable: false, title:'MORE', template: '/app/user/specific-fiesta/directives/specific-fiesta/partials/sfiesta-blogs.ejs'},
		];	/** {array} contains tab objects **/
		$scope.fiesta; /** {object} that contains the selected FIESTA */
		$scope.executive = {}; /** {object} that contains the executive director of selected FIESTA */
		$scope.commcolumns = 1; /** {int} for the column count of commoditie in about */
		$scope.type = 'fiesta';
		$scope.comments=[];
		$scope.comment={};
		$scope.commentsPage = 1;

		$scope.reactClickFiesta = '';
		$scope.likeCountFiesta = 0;
		$scope.happyCountFiesta = 0;
		$scope.sadCountFiesta = 0;
		$scope.blogActive = '';

		FiestaSrvc.GetOneCms('fiesta')
		 .then(function(cms){
			 $scope.fiesta_cms = cms[0];
		 });

		 FiestaSrvc.GetOneCms($routeParams.fiestaId)
 		 .then(function(cms){
 			 $scope.sfiesta_cms = cms[0];
 		 });

		/**
		 * Get FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 **/
		FiestaSrvc.GetOne($routeParams.fiestaId)
		 .then(function(data) {
			 $scope.fiesta = data;

			 _paq.push(['setCustomDimension', 1, $scope.fiesta.title]);
			 _paq.push(['trackPageView']);
			 (function() {
			   var u="//128.199.221.54/piwik/";
			   _paq.push(['setTrackerUrl', u+'piwik.php']);
			   _paq.push(['setSiteId', '1']);
			   var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
			   g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
			 })();

			 if(data.magazine) $scope.fiesta.mag_thumb = data.magazine.replace('.pdf', '-0.png');

			 if(data.commodity.length < 4) $scope.commcolumns = 1;
			 else if(data.commodity.length < 12) $scope.commcolumns = 2;
			 else $scope.commcolumns = 3;

			 FiestaSrvc.GetAllActivity($routeParams.fiestaId)
			 .then(function(activity) {
				 $scope.activity = activity;
				 if(activity.length == 0) $scope.tabs[1].disable = true;
				 if($scope.fiesta.vicinityMap.path) $scope.tabs[1].disable = false;
				 if($scope.fiesta.coordinates.lat) $scope.tabs[1].disable = false;
			 });

		 });

		 FiestaSrvc.GetOneComment($routeParams.fiestaId, $scope.type, $routeParams.fiestaId)
		 .then(function(comments) {
				$scope.comments = $filter('filter')(comments, {approve: true});
				$scope.comments = $filter('orderBy')($scope.comments, 'timestamp', true);
		 });

		FiestaSrvc.GetAllTechnology($routeParams.fiestaId)
    .then(function (tech) {
       if(tech.length == 0) $scope.tabs[2].disable = true;
    });

		FiestaSrvc.GetAllPoster($routeParams.fiestaId)
		 .then(function(poster) {
			 if(poster.length == 0) $scope.tabs[3].disable = true;
		});

		FiestaSrvc.GetAllAward($routeParams.fiestaId)
     .then(function(award) {
       if(award.length == 0) $scope.tabs[4].disable = true;
    });

		FiestaSrvc.GetAllPhoto($routeParams.fiestaId)
		 .then(function(photo) {
			 if(photo.length == 0) {
				 FiestaSrvc.GetAllVideo($routeParams.fiestaId)
					 .then(function(video) {
						 if(video.length == 0) $scope.tabs[5].disable = true;
				 });
			 }
		});

		FiestaSrvc.GetWriteUps($routeParams.fiestaId)
		 .then(function(data) {
			 let handler = false;
			 angular.forEach(data, function(value, ind){
				  if(ind != '_id') {
				 		if(value.body != '') handler = true;
				 }
			 });
			 if(!handler) {
				 FiestaSrvc.GetAllProfile($routeParams.fiestaId)
				 .then(function(profile) {
					 if(profile.length == 0) {
						 FiestaSrvc.GetAllEvent($routeParams.fiestaId)
						 .then(function(event) {
							 if(event.length == 0) {
								 FiestaSrvc.GetAllBlog($routeParams.fiestaId)
								 .then(function(blog) {
									 if(blog.length == 0) $scope.tabs[6].disable = true;
								 });
							 }
						 });
					 }
				 });
			 }
		});
		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		$scope.loggedIn = AuthSrvc.IsLoggedIn(true);
		if($scope.loggedIn) {
			$scope.adminId = AuthSrvc.GetAdmin()._id;
			$scope.name = AuthSrvc.GetAdmin().name;
			$scope.isAdmin = (AuthSrvc.GetAdmin().isAdmin) || false;
		}

		$scope.goTo = function (url) {
			$location.url(url);
		};


		/**
		 * Set tab view depending on its slug
		 **/
		let activeTabIndex = 0;
		if($routeParams.hasOwnProperty('tabSlug')){
			activeTabIndex = $scope.tabs.findIndex(tabs => tabs.slug===$routeParams.tabSlug)
			if(activeTabIndex == -1) {
				$location.path('fiesta/'+$routeParams.fiestaId+'/');
			}

			$scope.activeJustified = activeTabIndex+1;
		}
		$scope.tabTemplateUrl = $scope.tabs[activeTabIndex].template;

		/***************************************************************************
 		 @INFO: Scope Functions
 		***************************************************************************/
		 /**
 		 * Change location of app when clicked on tab
		 * - @param {object} tab - contains the tab slug, title, template
 		 **/
		$scope.setTabContent = function(tab, ind) {
			if(!ind) $location.path('fiesta/'+$routeParams.fiestaId+'/'+tab.slug).search('type', null)
			else $location.path('fiesta/'+$routeParams.fiestaId+'/'+tab.slug).search('type', ind);
 		}

		$scope.getWriteUps = function() {
			FiestaSrvc.GetWriteUps($routeParams.fiestaId)
			.then(function(data) {
				$scope.executive = data.executive;
				$scope.executive.transformedBody = data.executive.body.replace(/<(?:.|\n)*?>/gm, '');
			});
		}

	 	$scope.AddComment = function() {
			if($scope.comment.comment != ''){
				if(!$scope.comment.username) $scope.comment.username = 'Anonymous';

			let commentData = {
				username: $scope.comment.username,
				type: $scope.type,
				typeId: $scope.fiesta._id,
				comment: $scope.comment.comment
			};
			//track comments
			_paq.push(['trackEvent', 'Comment', commentData.comment, $scope.fiesta.title, 1]);

			FiestaSrvc.AddComment($routeParams.fiestaId, commentData)
			.then(function(data){
				UtilsSrvc.wait(500, function () {
					$scope.comment.username = '';
					$scope.comment.comment = '';
					UtilsSrvc.ToastSuccess('Comment Added!');
				});
			});
		 }
	 };

		$scope.AddReactFiesta = function(reaction) {
			let data = {
				'type': $scope.type,
        'typeId': $scope.fiesta._id,
        'userId': $cookies.get('_ga'),
        'reaction': reaction
			}

			if($scope.reactClickFiesta == reaction) {
				updateIcon(reaction, false);
				switch (reaction) {
					case 'like': $scope.likeCountFiesta = $scope.likeCountFiesta - 1;
					break;
					case 'happy': $scope.happyCountFiesta = $scope.happyCountFiesta - 1;
					break;
					case 'sad': $scope.sadCountFiesta = $scope.sadCountFiesta - 1;
					break;
				}
				FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
						data.typeId, data.userId)
				.then(function(data){
					$scope.reactClickFiesta = '';
				});
			} else {
				if($scope.reactClickFiesta=='') {
					updateIcon(reaction, true);
					switch (reaction) {
						case 'like': $scope.likeCountFiesta = $scope.likeCountFiesta + 1;
							break;
						case 'happy': $scope.happyCountFiesta = $scope.happyCountFiesta + 1;
							break;
						case 'sad': $scope.sadCountFiesta = $scope.sadCountFiesta + 1;
							break;
					}
					//track Socials
					_paq.push(['trackEvent', 'Reaction', data['reaction'], $scope.fiesta.title, 1]);

					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClickFiesta = reaction;
					});
				} else {
					updateIcon($scope.reactClickFiesta, false);
					switch ($scope.reactClickFiesta) {
						case 'like': $scope.likeCountFiesta = $scope.likeCountFiesta - 1;
						break;
						case 'happy': $scope.happyCountFiesta = $scope.happyCountFiesta - 1;
						break;
						case 'sad': $scope.sadCountFiesta = $scope.sadCountFiesta - 1;
						break;
					}
					FiestaSrvc.DeleteReaction($routeParams.fiestaId, data.type,
							data.typeId, data.userId)
					.then(function(data){
						$scope.reactClickFiesta = '';
					});

					updateIcon(reaction, true);
					switch (reaction) {
						case 'like': $scope.likeCountFiesta = $scope.likeCountFiesta + 1;
						break;
						case 'happy': $scope.happyCountFiesta = $scope.happyCountFiesta + 1;
						break;
						case 'sad': $scope.sadCountFiesta = $scope.sadCountFiesta + 1;
						break;
					}
					FiestaSrvc.AddReaction($routeParams.fiestaId, data)
					.then(function(data){
						$scope.reactClickFiesta = reaction;
					});
				}
			}
		};

		$scope.highlightCommentBox = function () {
			angular.element('.comment-box').parent().parent().css('box-shadow', '0px 0px 5px 0px skyblue');
		}

		$scope.removeHighlight = function () {
			angular.element('.comment-box').parent().parent().css('box-shadow', 'none');
		}

		$scope.deleteFiestaComment = function(comment){
			if(confirm('Are you sure you want to delete this comment?')) {
				for(var i = 0; i < $scope.comments.length; i++) {
					var obj = $scope.comments[i];
					if(obj && obj._id == comment._id) $scope.comments.splice(i, 1);
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
		$scope.updateReact = function () {
			$scope.likeCountFiesta = $scope.happyCountFiesta = $scope.sadCountFiesta = 0;
			FiestaSrvc.GetAllReaction($routeParams.fiestaId, $scope.type, $scope.fiesta._id)
			.then(function (data) {
				$scope.likeCountFiesta = $filter('filter')(data, {reaction: 'like'}).length;
				$scope.happyCountFiesta = $filter('filter')(data, {reaction: 'happy'}).length;
				$scope.sadCountFiesta = $filter('filter')(data, {reaction: 'sad'}).length;
			});
			checkUser();
		}

		function checkUser () {
			let userid = $cookies.get('_ga');
			FiestaSrvc.GetOneReaction($routeParams.fiestaId, $scope.type,
					$scope.fiesta._id, userid)
			.then(function (data) {
				if(data.reaction) {
					$scope.reactClickFiesta = data.reaction;
					updateIcon(data.reaction, true);
				} else {
					updateIcon('', false);
					$scope.reactClickFiesta = '';
				}
			});
		}

		function updateIcon (reaction, inverse) {
			if(!inverse) {
				$('.fa-thumbs-up').addClass('fa-thumbs-o-up');
				$('.fa-thumbs-o-up').removeClass('fa-thumbs-up');
				$('.fa-thumbs-o-up').css('color', '#000000')
				$('.fa-smile-o').removeClass('selected');
				$('.fa-frown-o').removeClass('selected');
			} else if(inverse) {
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
