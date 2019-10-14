"use strict";

angular.module("app")
  .directive("editPicture",function(){
    return {
      templateUrl:"app/admin/directives/manage-specific-fiesta/directives/fiesta-menu-panel/edit-picture/edit-picture.ejs",
      restrict: "E"
    };
  }
);
