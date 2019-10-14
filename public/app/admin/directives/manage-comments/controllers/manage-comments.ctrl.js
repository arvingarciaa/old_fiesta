'use strict';

(function () {
  angular.module('app')
        .controller('ManageCommentsCtrl', ManageCommentsCtrl);

	ManageCommentsCtrl.$inject = ['$scope', '$filter', 'FiestaSrvc', 'AuthSrvc', 'UtilsSrvc'];

	function ManageCommentsCtrl($scope, $filter, FiestaSrvc, AuthSrvc, UtilsSrvc) {
    $scope.fiesta_comments = {};
    $scope.photo_comments = {};
    $scope.ft_comments = {};

    FiestaSrvc.GetCommentsByType('fiesta')
    .then(function(comments) {
      comments = $filter('filter')(comments, {approve: false});
      angular.forEach(comments, function(value, index){

        FiestaSrvc.GetOne(value.fiestaId)
        .then(function(fiesta){
          if(!$scope.fiesta_comments[fiesta.title]) $scope.fiesta_comments[fiesta.title] = [];
          $scope.fiesta_comments[fiesta.title].push(value);
        })
      });
    });

    FiestaSrvc.GetCommentsByType('photo')
    .then(function(comments) {
      comments = $filter('filter')(comments, {approve: false});
      angular.forEach(comments, function(value, index){
        FiestaSrvc.GetOne(value.fiestaId)
        .then(function(fiesta){
          FiestaSrvc.GetOnePhoto(value.fiestaId, value.typeId)
          .then(function(photo){
            if(!$scope.photo_comments[fiesta.title]) $scope.photo_comments[fiesta.title] = {};
            if(!$scope.photo_comments[fiesta.title][value.typeId]) $scope.photo_comments[fiesta.title][value.typeId] = [];
            value.photo = photo;
            $scope.photo_comments[fiesta.title][value.typeId].push(value);
          });
        })
      });
    });

    FiestaSrvc.GetCommentsByType('feattech')
    .then(function(comments) {
      comments = $filter('filter')(comments, {approve: false});
      angular.forEach(comments, function(value, index){
        FiestaSrvc.GetOne(value.fiestaId)
        .then(function(fiesta){
          FiestaSrvc.GetOneTechnology(value.fiestaId, value.typeId)
          .then(function(tech){
            if(!$scope.ft_comments[fiesta.title]) $scope.ft_comments[fiesta.title] = {};
            if(!$scope.ft_comments[fiesta.title][tech.commodity]) $scope.ft_comments[fiesta.title][tech.commodity] = {};
            if(!$scope.ft_comments[fiesta.title][tech.commodity][value.typeId]) $scope.ft_comments[fiesta.title][tech.commodity][value.typeId] = [];
            value.tech = tech;
            $scope.ft_comments[fiesta.title][tech.commodity][value.typeId].push(value);
          });
        })
      });
    });

    $scope.isEmpty = function (obj) {
      for (var i in obj) if (obj.hasOwnProperty(i)) return false;
      return true;
    };

    $scope.approve = function(value){
      for (var prop in $scope.fiesta_comments) {
        var count = $scope.fiesta_comments[prop].length;
        if ($scope.fiesta_comments.hasOwnProperty(prop)) {
          for(var i = 0; i < count; i++) {
            var obj = $scope.fiesta_comments[prop][i];
            if(obj) {
              if(obj._id == value._id) {
                $scope.fiesta_comments[prop].splice(i, 1);
                if($scope.fiesta_comments[prop].length == 0) {
                  delete $scope.fiesta_comments[prop];
                }
              }
            }
          }
        }
      }

      FiestaSrvc.ApproveComment(value._id, true)
      .then(function(data){
        UtilsSrvc.ToastSuccess('Comment Approved!');
      });
    }

    $scope.remove = function(value){
      if(confirm('Are you sure you want to disapprove this comment?')){
        for (var prop in $scope.fiesta_comments) {
          var count = $scope.fiesta_comments[prop].length;
          if ($scope.fiesta_comments.hasOwnProperty(prop)) {
            for(var i = 0; i < count; i++) {
              var obj = $scope.fiesta_comments[prop][i];

              if(obj._id == value._id) {
                $scope.fiesta_comments[prop].splice(i, 1);
                if($scope.fiesta_comments[prop].length == 0){
                  delete $scope.fiesta_comments[prop];
                }
              }
            }
          }
        }

        FiestaSrvc.DeleteComment(value._id)
        .then(function(data){
          UtilsSrvc.ToastSuccess('Comment Disapproved!');
        });
      }
    }


    $scope.approvePhoto = function(value){
      for (var prop in $scope.photo_comments) {
        for(var prop2 in $scope.photo_comments[prop]) {
          var count = $scope.photo_comments[prop][prop2].length;
          if ($scope.photo_comments[prop].hasOwnProperty(prop2)) {
            for(var i = 0; i < count; i++) {
              var obj = $scope.photo_comments[prop][prop2][i];
              if(obj && obj._id == value._id) {
                $scope.photo_comments[prop][prop2].splice(i, 1);
                if($scope.photo_comments[prop][prop2].length == 0) {
                  delete $scope.photo_comments[prop][prop2];
                  if(Object.keys($scope.photo_comments[prop]).length == 0) {
                    delete $scope.photo_comments[prop];
                  }
                }
              }
            }
          }
        }
      }

      FiestaSrvc.ApproveComment(value._id, true)
      .then(function(data){
        UtilsSrvc.ToastSuccess('Comment Approved!');
      });
    }

    $scope.removePhoto = function(value){
      if(confirm('Are you sure you want to disapprove this comment?')){
        for (var prop in $scope.photo_comments) {
          for(var prop2 in $scope.photo_comments[prop]) {
            var count = $scope.photo_comments[prop][prop2].length;
            if ($scope.photo_comments[prop].hasOwnProperty(prop2)) {
              for(var i = 0; i < count; i++) {
                var obj = $scope.photo_comments[prop][prop2][i];
                if(obj && obj._id == value._id) {
                  $scope.photo_comments[prop][prop2].splice(i, 1);
                  if($scope.photo_comments[prop][prop2].length == 0) {
                    delete $scope.photo_comments[prop][prop2];
                    if(Object.keys($scope.photo_comments[prop]).length == 0) {
                      delete $scope.photo_comments[prop];
                    }
                  }
                }
              }
            }
          }
        }

        FiestaSrvc.DeleteComment(value._id)
        .then(function(data){
          UtilsSrvc.ToastSuccess('Comment Disapproved!');
        });
      }
    }

    $scope.approveFeattech = function(value){
      for (var prop in $scope.ft_comments) {
        for(var commodity in $scope.ft_comments[prop]) {
          for(var ftid in $scope.ft_comments[prop][commodity]){
            var count = $scope.ft_comments[prop][commodity][ftid].length;
            if ($scope.ft_comments[prop][commodity].hasOwnProperty(ftid)) {
              for(var i = 0; i < count; i++) {
                var obj = $scope.ft_comments[prop][commodity][ftid][i];
                if(obj && obj._id == value._id) {
                  $scope.ft_comments[prop][commodity][ftid].splice(i, 1);
                  if($scope.ft_comments[prop][commodity][ftid].length == 0) {
                    delete $scope.ft_comments[prop][commodity][ftid];
                    if(Object.keys($scope.ft_comments[prop][commodity]).length == 0) {
                      delete $scope.ft_comments[prop][commodity];
                      if(Object.keys($scope.ft_comments[prop]).length == 0) {
                        delete $scope.ft_comments[prop];
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      FiestaSrvc.ApproveComment(value._id, true)
      .then(function(data){
        UtilsSrvc.ToastSuccess('Comment Approved!');
      });
    }

    $scope.removeFeattech = function(value){
      if(confirm('Are you sure you want to disapprove this comment?')){
        for (var prop in $scope.ft_comments) {
          for(var commodity in $scope.ft_comments[prop]) {
            for(var ftid in $scope.ft_comments[prop][commodity]){
              var count = $scope.ft_comments[prop][commodity][ftid].length;
              if ($scope.ft_comments[prop][commodity].hasOwnProperty(ftid)) {
                for(var i = 0; i < count; i++) {
                  var obj = $scope.ft_comments[prop][commodity][ftid][i];
                  if(obj && obj._id == value._id) {
                    $scope.ft_comments[prop][commodity][ftid].splice(i, 1);
                    if($scope.ft_comments[prop][commodity][ftid].length == 0) {
                      delete $scope.ft_comments[prop][commodity][ftid];
                      if(Object.keys($scope.ft_comments[prop][commodity]).length == 0) {
                        delete $scope.ft_comments[prop][commodity];
                        if(Object.keys($scope.ft_comments[prop]).length == 0) {
                          delete $scope.ft_comments[prop];
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        FiestaSrvc.DeleteComment(value._id)
        .then(function(data){
          UtilsSrvc.ToastSuccess('Comment Disapproved!');
        });
      }
    }
  }
})();
