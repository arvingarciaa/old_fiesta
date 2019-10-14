/***
 * @author Noreen Louise C. Bundoc <ncbundoc@up.edu.ph>
 **/
"use strict";

/***************************************************************************
 @INFO: Directive
***************************************************************************/
angular.module("app")
  .directive("footerTag",function(){
	  return {
      templateUrl:"app/common/directives/footer/footer.ejs",
      restrict: "E"
	  }
  }
);
