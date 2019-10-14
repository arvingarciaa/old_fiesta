'use strict';

(function () {
  angular.module('app')
        .controller('ActivitiesCtrl', ActivitiesCtrl);

	ActivitiesCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function ActivitiesCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Local Variables and Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    $scope.fromAdd = null;
    $scope.activities = [];
    $scope.activity = {};
    $scope.dates = [];
    resetActivity();

    /***************************************************************************
     @INFO: Scope Function Headers
    ***************************************************************************/
    $scope.AddActivity = AddActivity;
    $scope.EditActivity = EditActivity;
    $scope.SubmitActivity = SubmitActivity;
    $scope.DeleteActivity = DeleteActivity;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    function receivedActivities(activities){
      $scope.activities = activities;
      $scope.dates = [];
      let holder = {};
      for (var i = 0; i < $scope.activities.length; i++) {
        let date = new Date($scope.activities[i].timestamp);
        let index = [monthNames[date.getMonth()], date.getDate(), date.getFullYear()].join(" ");
        if(!holder[index]) holder[index] = [];
          holder[index].push($scope.activities[i]);
      }

      for (var date in holder) {
        if (holder.hasOwnProperty(date)) {
          let x = {name: date, activities: holder[date]};
          $scope.dates.push(x);
        }
      }
    }
    function gotError(err){
      UtilsSrvc.ToastError(err);
    }
    function RefreshActivities() {
      FiestaSrvc.GetAllActivity(fiestaId)
        .then(receivedActivities, gotError);
    }
    RefreshActivities();

    /***************************************************************************
     @INFO: Scope Functions Definition
    ***************************************************************************/
    function AddActivity() {
      $scope.togglepeople = false;
      $scope.togglesubtitle = false;
      $scope.fromAdd = true;
      resetActivity();
    }

    function EditActivity(activity) {
      $scope.togglepeople = false;
      $scope.togglesubtitle = false;
      $scope.fromAdd = false;
      $scope.activity._id = activity._id;
      $scope.activity.title = activity.title;
      $scope.activity.sector = activity.sector;
      $scope.activity.location = activity.location;
      $scope.activity.date = new Date(activity.timestamp);
      $scope.activity.time = new Date("Thu Jan 01 1970");;
      $scope.activity.time.setHours(new Date(activity.timestamp).getHours());
      $scope.activity.time.setMinutes(new Date(activity.timestamp).getMinutes());
      $scope.activity.people = [];
      for (let i = 0; activity.people && i < activity.people.length; i++) {
        $scope.activity.people[i] = activity.people[i];
      }
      $scope.activity.subtitle = [];
      for (let i = 0; activity.subtitle && i < activity.subtitle.length; i++) {
        $scope.activity.subtitle[i] = activity.subtitle[i];
      }
    }

    function SubmitActivity() {
      angular.element('.form-group').removeClass('has-error');
      // ADD ACTIVITY
      if($scope.fromAdd){
        if($scope.activity.title == ''){
          UtilsSrvc.ToastError('Please enter some activity title.');
          angular.element('.activity-title').addClass('has-error');
          return;
        }
        if($scope.activity.location == ''){
          UtilsSrvc.ToastError('Please enter some activity location.');
          angular.element('.activity-location').addClass('has-error');
          return;
        }
        if(!$scope.activity.date){
          UtilsSrvc.ToastError('Please enter some activity date.');
          angular.element('.activity-date').addClass('has-error');
          return;
        }
        if(!$scope.activity.time){
          UtilsSrvc.ToastError('Please enter some activity time.');
          angular.element('.activity-time').addClass('has-error');
          return;
        }
        let newActivity = {
          'title': $scope.activity.title,
          'location': $scope.activity.location,
          'sector': $scope.activity.sector,
          'timestamp': $scope.activity.date,
        };
        newActivity.timestamp.setHours($scope.activity.time.getHours());
        newActivity.timestamp.setMinutes($scope.activity.time.getMinutes());
        newActivity.people = [];
        newActivity.subtitle = [];
        for (let i = 0; i < $scope.activity.people.length; i++) {
          newActivity.people.push($scope.activity.people[i].text);
        }
        for (let i = 0; i < $scope.activity.subtitle.length; i++) {
          newActivity.subtitle.push($scope.activity.subtitle[i].text);
        }

        $scope.activityLoading = true;
        FiestaSrvc.AddActivity(fiestaId, newActivity)
          .then(function (res) {
            UtilsSrvc.wait(1000, function () {
              RefreshActivities();
              UtilsSrvc.ToastSuccess('Added activity!');
              resetActivity();
              angular.element('#activityModal').modal('hide');
              $scope.activityLoading = false;
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.activityLoading = false;
          });
      }
      // EDIT ACTIVITY
      else {
        if($scope.activity.title == ''){
          UtilsSrvc.ToastError('Please enter some activity title.');
          angular.element('.activity-title').addClass('has-error');
          return;
        }
        if($scope.activity.location == ''){
          UtilsSrvc.ToastError('Please enter some activity location.');
          angular.element('.activity-location').addClass('has-error');
          return;
        }
        if(!$scope.activity.date){
          UtilsSrvc.ToastError('Please enter some activity date.');
          angular.element('.activity-date').addClass('has-error');
          return;
        }
        if(!$scope.activity.time){
          UtilsSrvc.ToastError('Please enter some activity time.');
          angular.element('.activity-time').addClass('has-error');
          return;
        }

        let updatedActivity = {
          '_id': $scope.activity._id,
          'title': $scope.activity.title,
          'sector': $scope.activity.sector,
          'location': $scope.activity.location,
          'timestamp': $scope.activity.date
        };
        updatedActivity.timestamp.setHours($scope.activity.time.getHours());
        updatedActivity.timestamp.setMinutes($scope.activity.time.getMinutes());
        updatedActivity.people = [];
        updatedActivity.subtitle = [];
        for (let i = 0; i < $scope.activity.people.length; i++) {
          updatedActivity.people.push($scope.activity.people[i].text);
        }
        for (let i = 0; i < $scope.activity.subtitle.length; i++) {
          updatedActivity.subtitle.push($scope.activity.subtitle[i].text);
        }

        $scope.activityLoading = true;
        FiestaSrvc.EditActivity(fiestaId, updatedActivity)
          .then(function (res) {
            UtilsSrvc.wait(1000, function () {
              RefreshActivities();
              UtilsSrvc.ToastSuccess('Updated activity!');
              UtilsSrvc.UpdateObjectInList($scope.activities, res._id, res);
              angular.element('#activityModal').modal('hide');
              $scope.activityLoading = false;
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.activityLoading = false;
          });
      }
    }

    function DeleteActivity(activityId) {
      if (UtilsSrvc.Ask('Delete this activity?')) {
        FiestaSrvc.DeleteActivity(fiestaId, activityId)
          .then(function (res) {
            UtilsSrvc.ToastSuccess('Deleted activity!');
            RefreshActivities();
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
    }

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    function resetActivity() {
      $scope.activity = {
        title: '',
        location: '',
        date: null,
        time: null,
        people: [],
        subtitle: []
      };
    }
  }
})();
