'use strict';

(function () {
  angular.module('app')
        .controller('EventsCtrl', EventsCtrl);

	EventsCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function EventsCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
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
      'type': '',
      'body': '',
      'authors': [],
      'tags': [],
      'timestamp': null
    };
    $scope.focused = {
      'image': {path:'', credits:''},
      'title': '',
      'type': '',
      'body': '',
      'authors': [],
      'tags': [],
      'timestamp': null
    };
    $scope.events = [];

    let GetEvents = FiestaSrvc.GetAllEvent;
    GetEvents(fiestaId)
      .then(function (events) {
        $scope.events = events;
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
    $scope.addAuthor = function(name, position){
      if(name.trim()=='' && position.trim()=='') return;
      if(!$scope.writeup.authors) $scope.writeup.authors = [];
      $scope.writeup.authors.pushIfNotExist({
        'name': name,
        'position': position
      });
      $scope.author = {name:'', position:''};
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
        'type': '',
        'title': '',
        'body': '',
        'authors': [],
        'tags': [],
        'timestamp': null
      };
      angular.copy(item, $scope.writeup);
    };
    $scope.focus = function (item) {
      angular.copy(item, $scope.focused);
    };
    $scope.AddEvent = function (item) {
      let AddEvent = FiestaSrvc.AddEvent;
      item.credits = (item.image)? item.image.credits: '';
      if (!item.title) {
        UtilsSrvc.ToastError('Enter some title!');
        return;
      }
      if (!item.type) {
        UtilsSrvc.ToastError('Enter some type!');
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
      $scope.eventLoading = true;
      AddEvent(fiestaId, item)
        .then(function (newEvent) {
          UtilsSrvc.wait(1000, function () {
            $scope.writeup = {
              'inputImage': null,
              'image': {path:'', credits:''},
              'title': '',
              'type': '',
              'body': '',
              'authors': [],
              'tags': [],
              'timestamp': null
            };
            $scope.events.push(newEvent);
            UtilsSrvc.ToastSuccess('Added event!');
            angular.element('#editEvent').modal('hide');
            $scope.eventLoading = false;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.eventLoading = false;
        });
    };

    $scope.EditEvent = function (item) {
      let EditEvent = FiestaSrvc.EditEvent;
      item.credits = item.image.credits;
      $scope.eventLoading = true;
      EditEvent(fiestaId, item)
        .then(function (edited) {
          UtilsSrvc.wait(1000, function () {
            UtilsSrvc.UpdateObjectInList($scope.events, item._id, edited);
            UtilsSrvc.ToastSuccess('Edited event!');
            angular.element('#editEvent').modal('hide');
            $scope.eventLoading = false;
          });

        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.eventLoading = false;
        });
    };

    $scope.point = function (tech) {
      $scope.eventPointer = tech;
    };

    $scope.EditImage = function (inputImage) {
      $scope.loading = true;
      let image = {
        '_id': $scope.eventPointer._id.toString(),
        'inputImage': inputImage
      };
      FiestaSrvc.UpdateEventImage($routeParams.fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            $scope.loading = false;
            $scope.eventPointer.image.path = data.image.path;
            angular.element('#editImage').modal('hide');
            UtilsSrvc.ToastSuccess('Updated image!');
            $scope.inputImage = null;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    };

    $scope.DeleteEvent = function (id) {
      if (UtilsSrvc.Ask('Delete this event?')) {
        let DeleteEvent = FiestaSrvc.DeleteEvent;

        DeleteEvent(fiestaId, id)
        .then(function (success) {
          UtilsSrvc.RemoveObjectInList($scope.events, id);
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
