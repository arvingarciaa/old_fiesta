"use strict";

angular.module("app")
  .directive("accounts",function(){
    return {
      templateUrl:"app/admin/directives/manage-account/directives/accounts/directives/accounts.ejs",
      restrict: "E"
    };
  }
);
