'use strict';

(function () {
  angular.module('app')
        .controller('VideosCtrl', VideosCtrl);

	VideosCtrl.$inject = ['$scope', '$routeParams', 'FiestaSrvc', 'UtilsSrvc'];

	function VideosCtrl($scope, $routeParams, FiestaSrvc, UtilsSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.videos = [];
    $scope.focusedVideo = {};
    $scope.video = {};

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.FocusVideo = FocusVideo;
    $scope.VideoModal = VideoModal;
    $scope.CheckUrl = CheckUrl;
    $scope.SubmitVideo = SubmitVideo;
    $scope.NextVideo = NextVideo;
    $scope.PrevVideo = PrevVideo;
    $scope.AddClose = AddClose;
    $scope.FocusClose = FocusClose;
    $scope.DeleteVideo = DeleteVideo;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    FiestaSrvc.GetAllVideo(fiestaId)
      .then(function (videos) {
        $scope.videos = videos;
        getYoutubeData();
      })
      .catch(function (err) {
        UtilsSrvc.ToastError('Something went wrong!');
        UtilsSrvc.error(err);
      });

    /***************************************************************************
     @INFO: Scope Definitions
    ***************************************************************************/
    function FocusVideo(index) {
      $scope.focusedVideo = {
        youtubeId: $scope.videos[index].youtubeId,
        description: $scope.videos[index].description,
        title: $scope.videos[index].title,
        tags: $scope.videos[index].tags
      };

      $scope.focusedVideo.index = index;
    }

    function VideoModal(index) {
      $scope.toggletags = false;
      if(!index && index != 0){
        $scope.video.url = '';
        $scope.video.credits = '';
        $scope.video.tags = [];
        $scope.video.mode = 'Add';
      }
      else{
        $scope.video.url = 'https://www.youtube.com/watch?v='+$scope.videos[index].youtubeId;
        $scope.video.credits = $scope.videos[index].credits;
        $scope.video.tags = $scope.videos[index].tags;
        $scope.video._id = $scope.videos[index]._id;
        $scope.video.mode = 'Update';
      }
    }

    function CheckUrl(link) {
      return (/^((http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[^"&?\/\s]{11})|([^"&?\/\s]{11})$/.test(link));
    }

    function SubmitVideo() {
      angular.element('.form-group').removeClass('.has-error');
      if(!$scope.video.url || !$scope.CheckUrl($scope.video.url)) {
        angular.element('.video-url').addClass('.has-error');
        UtilsSrvc.ToastError('Enter a valid youtube url or id!');
        return;
      }

      if(!$scope.video.credits || $scope.video.credits.trim() == ''){
        angular.element('.video-credits').addClass('.has-error');
        UtilsSrvc.ToastError('Please enter some credits!');
        return;
      }

      let video = {
        youtubeId: getYoutubeId($scope.video.url),
        credits: $scope.video.credits,
        tags: $scope.video.tags
      };
      if($scope.video.mode == 'Add'){
        $scope.videoLoading = true;
        FiestaSrvc.AddVideo(fiestaId, video)
          .then(function (video) {
            FiestaSrvc.GetYoutubeData(video.youtubeId)
              .then(function (youtubeData) {
                UtilsSrvc.wait(1000, function () {
                  video.title = youtubeData.items[0].snippet.title;
                  video.description = youtubeData.items[0].snippet.description;
                  $scope.videos.push(video);
                  UtilsSrvc.ToastSuccess('Video added!');
                  $scope.video = {};
                  $scope.video.mode = 'Add';
                  angular.element('#VideoModal').modal('hide');
                  $scope.videoLoading = false;
                });
              })
              .catch(function (err) {
                UtilsSrvc.ToastError('Something went wrong!');
                UtilsSrvc.error(err);
                $scope.videoLoading = false;
              });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.videoLoading = false;
          });
      }
      else {
        video._id = $scope.video._id;
        $scope.videoLoading = true;
        FiestaSrvc.EditVideo(fiestaId, video)
          .then(function (video) {
            FiestaSrvc.GetYoutubeData(video.youtubeId)
              .then(function (youtubeData) {
                UtilsSrvc.wait(1000, function () {
                  video.title = youtubeData.items[0].snippet.title;
                  video.description = youtubeData.items[0].snippet.description;
                  UtilsSrvc.UpdateObjectInList($scope.videos, video._id, video)
                  UtilsSrvc.ToastSuccess('Video updated!');
                  angular.element('#VideoModal').modal('hide');
                  $scope.videoLoading = false;
                });
              })
              .catch(function (err) {
                UtilsSrvc.ToastError('Something went wrong!');
                UtilsSrvc.error(err);
                $scope.videoLoading = false;
              });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.videoLoading = false;
          });
      }
    }

    function NextVideo(index) {
      if(index+1 < $scope.videos.length){
        FocusVideo(index+1);
      }
    }

    function PrevVideo(index) {
      if(index-1 >= 0){
        FocusVideo(index-1);
      }
    }

    function AddClose() {
      $scope.video.url = ' ';
    }

    function FocusClose() {
      $scope.focusedVideo.youtubeId = ' ';
    }

    function DeleteVideo(videoId) {

      if (UtilsSrvc.Ask('Delete this video?')) {
        FiestaSrvc.DeleteVideo(fiestaId, videoId)
          .then(function (res) {
            UtilsSrvc.RemoveObjectInList($scope.videos, videoId);
            UtilsSrvc.ToastSuccess('Video deleted!');
          })
          .catch(function (err) {
            UtilsSrvc.ToastSuccess(err);
          });
      }
    }

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    function getYoutubeId(url) {
      if(/^((http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[^"&?\/\s]{11})$/.test(url)){
        return url.trim().substr(url.length-11, 11);
      }
      if(/^([^"&?\/\s]{11})$/.test(url)){
        return url.trim();
      }
      return '';
    }

    function getYoutubeData() {
      for (let i = 0; i < $scope.videos.length; i++) {
        FiestaSrvc.GetYoutubeData($scope.videos[i].youtubeId)
          .then(function (youtubeData) {
            $scope.videos[i].title = youtubeData.items[0].snippet.title;
            $scope.videos[i].description = youtubeData.items[0].snippet.description;
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
    }
  }
})();
