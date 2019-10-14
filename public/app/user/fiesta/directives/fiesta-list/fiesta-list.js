angular.module("app")
  .directive("fiestaList",function(){
	  return {
      templateUrl:"app/user/fiesta/directives/fiesta-list/fiesta-list.ejs",
      restrict: "E"
	  }
  }
);
