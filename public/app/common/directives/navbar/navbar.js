/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

/***************************************************************************
 @INFO: Directive
***************************************************************************/
angular.module("app")
  .directive("navbar",function($rootScope){
	  return {
      templateUrl:"app/common/directives/navbar/navbar.ejs",
      restrict: "E"
	  }
  }
);
