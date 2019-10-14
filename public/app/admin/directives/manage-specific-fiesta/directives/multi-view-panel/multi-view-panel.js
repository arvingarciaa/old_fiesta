"use strict";

angular.module("app")
  .directive("multiViewPanel",function(){
    return {
      templateUrl:"app/admin/directives/manage-specific-fiesta/directives/multi-view-panel/multi-view-panel.ejs",
      restrict: "E"
    };
  }
);
