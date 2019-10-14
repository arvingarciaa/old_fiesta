'use strict';

angular.module('app')
  .directive('blogs',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/blogs.ejs',
      restrict: 'E'
    };
  }
);
