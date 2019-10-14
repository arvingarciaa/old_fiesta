'use strict';

(function () {
  angular.module('app')
        .controller('BlogsCtrl', BlogsCtrl);

	BlogsCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function BlogsCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.options = UtilsSrvc.GetSummernoteOptions();
    $scope.action = '';
    $scope.writeup = {
      'inputImage': null,
      'image': {path:'', credits:''},
      'title': '',
      'body': '',
      'author': '',
      'tags': [],
      'timestamp': null
    };
    $scope.focused = {
      'image': {path:'', credits:''},
      'title': '',
      'body': '',
      'author': '',
      'tags': [],
      'timestamp': null
    };
    $scope.blogs = [];

    let GetBlogs = FiestaSrvc.GetAllBlog;
    GetBlogs(fiestaId)
      .then(function (blogs) {
        $scope.blogs = blogs;
      })
      .catch(function (err) {
        UtilsSrvc.error(err);
      });

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.toggleUpload = function () {
      angular.element('#upload').click();
    };
    $scope.add = function () {
      $scope.toggletags = false;
      $scope.action='add';
      $scope.writeup = {title:'',body:'',author:'', tags: [], timestamp:null};
    };
    $scope.select = function (item) {
      $scope.toggletags = false;
      $scope.action = 'edit';
      $scope.writeup = {
        'inputImage': null,
        'image': {path:'', credits:''},
        'title': '',
        'body': '',
        'author': '',
        'tags': [],
        'timestamp': null
      };
      angular.copy(item, $scope.writeup);
    };
    $scope.focus = function (item) {
      angular.copy(item, $scope.focused);
    }
    $scope.AddBlog = function (item) {
      let AddBlog = FiestaSrvc.AddBlog;

      item.credits = (item.image)? item.image.credits: '';


      if (!item.title) {
        UtilsSrvc.ToastError('Enter some title!');
        return;
      }
      if (!item.author) {
        UtilsSrvc.ToastError('Enter some author!');
        return;
      }
      if (!item.inputImage) {
        UtilsSrvc.ToastError('No image uploaded!');
        return;
      }
      if (!item.credits) {
        UtilsSrvc.ToastError('Enter some credits!');
        return;
      }
      if (!item.body) {
        UtilsSrvc.ToastError('Enter some body!');
        return;
      }
      $scope.blogLoading = true;
      AddBlog(fiestaId, item)
        .then(function (newBlog) {
          UtilsSrvc.wait(1000, function () {
            $scope.writeup = {
              'inputImage': null,
              'image': {path:'', credits:''},
              'title': '',
              'body': '',
              'author': '',
              'tags': [],
              'timestamp': null
            };
            $scope.blogs.push(newBlog);
            UtilsSrvc.ToastSuccess('Added blog!');
            angular.element('#editBlog').modal('hide');
            $scope.blogLoading = false;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.blogLoading = false;
        });
    }

    $scope.EditBlog = function (item) {
      let EditBlog = FiestaSrvc.EditBlog;
      item.credits = item.image.credits;
      $scope.blogLoading = true;
      EditBlog(fiestaId, item)
        .then(function (edited) {
          UtilsSrvc.wait(1000, function () {
            UtilsSrvc.UpdateObjectInList($scope.blogs, item._id, edited);
            UtilsSrvc.ToastSuccess('Edited blog!');
            angular.element('#editBlog').modal('hide');
            $scope.blogLoading = false;
          });

        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.blogLoading = false;
        });
    };

    $scope.point = function (tech) {
      $scope.blogPointer = tech;
    }

    $scope.EditImage = function (inputImage) {
      $scope.loading = true;
      let image = {
        '_id': $scope.blogPointer._id.toString(),
        'inputImage': inputImage
      };
      FiestaSrvc.UpdateBlogImage($routeParams.fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            $scope.loading = false;
            $scope.blogPointer.image.path = data.image.path;
            angular.element('#editImage').modal('hide');
            UtilsSrvc.ToastSuccess('Updated image!');
            $scope.inputImage = null;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    };

    $scope.DeleteBlog = function (id) {
      if (UtilsSrvc.Ask('Delete this blog?')) {
        let DeleteBlog = FiestaSrvc.DeleteBlog;

        DeleteBlog(fiestaId, id)
        .then(function (success) {
          UtilsSrvc.RemoveObjectInList($scope.blogs, id);
          UtilsSrvc.ToastSuccess(success.message);
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
        });
      }
    };

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
  }
})();
