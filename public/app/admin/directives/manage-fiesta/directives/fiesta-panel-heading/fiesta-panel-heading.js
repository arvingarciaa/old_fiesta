"use strict";

angular.module("app")
  .directive("fiestaPanelHeading",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/fiesta-panel-heading/fiesta-panel-heading.ejs",
      restrict: "E"
    };
  }
);
