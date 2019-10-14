"use strict";

angular.module("app")
  .directive("messages",function(){
    return {
      templateUrl:"app/admin/directives/manage-account/directives/messages/directives/messages.ejs",
      restrict: "E"
    };
  }
);
