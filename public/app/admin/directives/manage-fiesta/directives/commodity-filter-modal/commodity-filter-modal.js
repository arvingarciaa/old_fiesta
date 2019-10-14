"use strict";

angular.module("app")
  .directive("commodityFilterModal",function(){
    return {
      templateUrl:"app/admin/directives/manage-fiesta/directives/commodity-filter-modal/commodity-filter-modal.ejs",
      restrict: "E"
    };
  }
);
