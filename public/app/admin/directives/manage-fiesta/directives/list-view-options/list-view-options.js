"use strict";

angular.module("app")
  .directive("listViewOptions",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/list-view-options/list-view-options.ejs",
      restrict: "E"
    };
  }
);
