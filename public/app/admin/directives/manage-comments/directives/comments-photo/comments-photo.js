angular.module("app")
  .directive("commentsPhoto",function(){
	  return {
      templateUrl:"app/admin/directives/manage-comments/directives/comments-photo/comments-photo.ejs",
      restrict: "E"
	  }
  }
);
