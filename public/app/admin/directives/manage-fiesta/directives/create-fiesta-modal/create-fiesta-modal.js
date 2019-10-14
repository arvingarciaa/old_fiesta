"use strict";

angular.module("app")
  .directive("createFiestaModal",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/create-fiesta-modal/create-fiesta-modal.ejs",
      restrict: "E"
    };
  }
);
