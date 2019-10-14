angular.module("app")
  .directive("specificFiesta",function(){
	  return {
      templateUrl:"app/user/specific-fiesta/directives/specific-fiesta/specific-fiesta.ejs",
      restrict: "E"
	  }
  }
);
