"use strict";

angular.module("app")
  .directive("manageFiestaList",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/manage-fiesta-list/manage-fiesta-list.ejs",
      restrict: "E"
    };
  }
);
