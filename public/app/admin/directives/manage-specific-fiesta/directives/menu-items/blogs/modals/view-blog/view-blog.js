'use strict';

angular.module('app')
  .directive('viewBlog',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/modals/view-blog/view-blog.ejs',
      restrict: 'E'
    };
  }
);
