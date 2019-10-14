angular.module("app")
  .directive("customizeSpecific",function(){
	  return {
      templateUrl:"app/admin/directives/customize/directives/customize-specific/customize-specific.ejs",
      restrict: "E"
	  }
  }
);
