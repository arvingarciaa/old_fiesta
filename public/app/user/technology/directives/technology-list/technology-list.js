angular.module("app")
  .directive("technologyList",function(){
	  return {
      templateUrl:"app/user/technology/directives/technology-list/technology-list.ejs",
      restrict: "E"
	  }
  }
);
