angular.module("app")
  .directive("commentsFiesta",function(){
	  return {
      templateUrl:"app/admin/directives/manage-comments/directives/comments-fiesta/comments-fiesta.ejs",
      restrict: "E"
	  }
  }
);
