"use strict";

angular.module("app")
  .directive("fiestaMenuPanel",function(){
    return {
      templateUrl:"app/admin/directives/manage-specific-fiesta/directives/fiesta-menu-panel/fiesta-menu-panel.ejs",
      restrict: "E"
    };
  }
);
