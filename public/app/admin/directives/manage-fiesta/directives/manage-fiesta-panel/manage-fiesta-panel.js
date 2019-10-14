"use strict";

angular.module("app")
  .directive("manageFiestaPanel",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/manage-fiesta-panel/manage-fiesta-panel.ejs",
      restrict: "E"
    };
  }
);
