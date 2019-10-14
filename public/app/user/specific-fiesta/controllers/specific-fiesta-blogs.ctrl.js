/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

(() => {
	angular.module("app")
		     .controller("SFiestaBlogsCtrl", SFiestaBlogsCtrl);

	SFiestaBlogsCtrl.$inject = ["$scope", "$filter", "$routeParams", "FiestaSrvc"];

	function SFiestaBlogsCtrl($scope, $filter, $routeParams, FiestaSrvc) {
		/***************************************************************************
		 @INFO: Scope Variables
		***************************************************************************/
		$scope.blogs = [];
    $scope.blogFocus = null; /** {object} select blog to read */

		$scope.pageSize = 12;
		$scope.blogsPage = 1;

		$scope.blogActive = $routeParams.type;
		if($scope.blogActive == 'Message') $scope.blogActive = "Message";
		/***************************************************************************
		 @INFO: Initialization
		***************************************************************************/
		/**
		 * Gets all writeups (exec dirs, content) of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
		FiestaSrvc.GetWriteUps($routeParams.fiestaId)
		 .then(function(data) {
			 let temp_id = data._id;
			 angular.forEach(data, function(value, ind){
				 if(value.body != '') {
					 if(ind != '_id') {
						 value.category = '';
						 value._id = temp_id+ind;
					 }
					 if(ind === 'executive') value.category = "Executive Director's Note";
					 else if (ind === 'editorial') value.category = 'Contents (Editorial)';
					 else if (ind === 'infocus') value.category = 'Contents (In Focus)';
					 else if (ind === 'fiestaval') value.category = 'Contents (Fiestaval)';

					 if(value.category) $scope.blogs.push(value);
				 }
			 });
			 $scope.blogs = $filter('orderBy')($scope.blogs, 'timestamp', true);
			 let category;
 			 switch($scope.blogActive) {
 				 case "Executive Director's Note": category = "Executive Director's Note";
 				 break;
 				 case 'Contents': category = "Contents";//["Editorial","In Focus", "Festiaval"];
 				 break;
 				 case 'Profiles': category = 'Profile';
 				 break;
 				 case 'Events': category = 'Event';
 				 break;
 				 case 'Blogs': category = 'Blog';
 				 break;
 			 }
 			 $scope.blogs = $filter('filter')($scope.blogs, {category: category});
		}).catch(function (err) {

		});

		/**
		 * Gets all profiles of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
		FiestaSrvc.GetAllProfile($routeParams.fiestaId)
		 .then(function(data) {
			 angular.forEach(data, function(value, ind){
				 value.category = 'Profile';
				 $scope.blogs.push(value);
			 });
			 $scope.blogs = $filter('orderBy')($scope.blogs, 'timestamp', true);
			 let category;
 			 switch($scope.blogActive) {
 				 case "Executive Director's Note": category = "Executive Director's Note";
 				 break;
 				 case 'Contents': category = "Contents";//["Editorial","In Focus", "Festiaval"];
 				 break;
 				 case 'Profiles': category = 'Profile';
 				 break;
 				 case 'Events': category = 'Event';
 				 break;
 				 case 'Blogs': category = 'Blog';
 				 break;
 			 }
 			 $scope.blogs = $filter('filter')($scope.blogs, {category: category});
		});

		/**
		 * Gets all events of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
		FiestaSrvc.GetAllEvent($routeParams.fiestaId)
		 .then(function(data) {
			 angular.forEach(data, function(value, ind){
				 value.category = 'Event ('+value.type+')';
				 $scope.blogs.push(value);
			 });
			 $scope.blogs = $filter('orderBy')($scope.blogs, 'timestamp', true);
			 let category;
 			 switch($scope.blogActive) {
 				 case "Executive Director's Note": category = "Executive Director's Note";
 				 break;
 				 case 'Contents': category = "Contents";//["Editorial","In Focus", "Festiaval"];
 				 break;
 				 case 'Profiles': category = 'Profile';
 				 break;
 				 case 'Events': category = 'Event';
 				 break;
 				 case 'Blogs': category = 'Blog';
 				 break;
 			 }
 			 $scope.blogs = $filter('filter')($scope.blogs, {category: category});

		});

		/**
		 * Gets all blogs of FIESTA
		 * - @param $routeParams.fiestaId - FIESTA id
		 */
    FiestaSrvc.GetAllBlog($routeParams.fiestaId)
     .then(function(data) {
			 angular.forEach(data, function(value, ind){
				 value.category = 'Blog';
				 $scope.blogs.push(value);
			 });
			 $scope.blogs = $filter('orderBy')($scope.blogs, 'timestamp', true);
			 let category;
 			 switch($scope.blogActive) {
 				 case "Executive Director's Note": category = "Executive Director's Note";
 				 break;
 				 case 'Contents': category = "Contents";//["Editorial","In Focus", "Festiaval"];
 				 break;
 				 case 'Profiles': category = 'Profile';
 				 break;
 				 case 'Events': category = 'Event';
 				 break;
 				 case 'Blogs': category = 'Blog';
 				 break;
 			 }
 			 $scope.blogs = $filter('filter')($scope.blogs, {category: category});
    });


		/***************************************************************************
		 @INFO: Scope Functions
		***************************************************************************/
		/**
		 * Sets the active blog on carousel
		 * - @param index - index of the selected blog
		 */
    $scope.SetBlogFocus = function(index) {
      $scope.blogFocus = $scope.blogs[($scope.blogsPage-1)*$scope.pageSize+index];
    }
  }
})();
