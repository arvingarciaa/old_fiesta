/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

/***************************************************************************
 @INFO: Directive
***************************************************************************/
angular.module("app")
  .directive("socials",function(){
	  return {
      templateUrl:"app/common/directives/socials/socials.ejs",
      restrict: "E"
	  }
  }
);
