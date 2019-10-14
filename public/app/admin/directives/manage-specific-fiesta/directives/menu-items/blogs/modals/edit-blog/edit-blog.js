'use strict';

angular.module('app')
  .directive('editBlog',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/modals/edit-blog/edit-blog.ejs',
      restrict: 'E'
    };
  }
);
