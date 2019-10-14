'use strict';

(function () {
  angular.module('app')
        .controller('ManageSpecificFiestaCtrl', ManageSpecificFiestaCtrl);

	ManageSpecificFiestaCtrl.$inject = ['$scope', '$route', '$window', '$routeParams', '$location', 'FiestaSrvc', 'UtilsSrvc', 'AuthSrvc'];

	function ManageSpecificFiestaCtrl($scope, $route, $window, $routeParams, $location, FiestaSrvc, UtilsSrvc, AuthSrvc) {
    FiestaSrvc.GetOneByAdmin($routeParams.fiestaId)
      .then(function (fiesta) {
        $scope.fiesta = fiesta;
        angular.element('title')[0].innerHTML = 'Manage - ' + fiesta.title;
      })
      .catch(function (err) {
        UtilsSrvc.log(err);
        // @TODO: create a 404 page for not found fiestas
        $window.location.href = '/lost?why=fiesta_not_found&admin=true';
      });

    if(AuthSrvc.IsLoggedIn()){
      $scope.loggedIn = true;
      /***************************************************************************
       @INFO: Scope Variables
      ***************************************************************************/
      $scope.fiesta = {};
      $scope.show = {};

      /***************************************************************************
       @INFO: Initialization
      ***************************************************************************/
      $scope.show['about'] = false;
      $scope.show['feat-tech'] = false;
      $scope.show['activities'] = false;
      $scope.show['awards'] = false;
      $scope.show['posters'] = false;
      $scope.show['photos'] = false;
      $scope.show['videos'] = false;
      $scope.show['blogs'] = false;
      $scope.show['more'] = false;
      $scope.show['content'] = false;
      $scope.show['profile'] = false;
      $scope.show['events'] = false;
      $scope.show['executive'] = false;
      showPanel($routeParams.view);

      $scope.viewAsPublic = function(){
        $location.path('/fiesta/'+$scope.fiesta._id);
      };

      /***************************************************************************
       @INFO: Scope Functions
      ***************************************************************************/
      /**
       * Removes any displayed menu, and displays the panel selected
       * - @param {string} panel - panel of choice
       */
      $scope.showPanel = showPanel;
      $scope.EditPicture = EditPicture;
      $scope.publishfiesta = publishfiesta;

      /***************************************************************************
       @INFO: Scope Functions Definitions
      ***************************************************************************/
      /**
       * Removes any displayed menu, and displays the panel selected
       * - @param {string} panel - panel of choice
       */
      function showPanel(panel){
        if (!panel || !$scope.show.hasOwnProperty(panel) ) {
          showPanel('about');
          return;
        }

        if($scope.show[panel])
          return;

        for (var menu in $scope.show)
          if(menu != panel)
            $scope.show[menu] = false;

        $scope.show[panel] = true;
        $location.search({view: panel});
        $( 'html, body').animate({
            scrollTop: $('body').offset().top
          }, 300);
      }

      function EditPicture(image) {
        if(!image){
          UtilsSrvc.ToastError('No photo uploaded!');
          return;
        }
        $scope.loading = true;
        FiestaSrvc.EditPicture($scope.fiesta._id, image)
          .then(function (data) {
            // wait for 1.5 seconds
            UtilsSrvc.wait(1500, function () {
              $scope.fiesta.picture = data.picture;
              UtilsSrvc.ToastSuccess('Updated fiesta picture!');
              $scope.inputImage = null;
              $scope.loading = false;
              angular.element('#editPicture').modal('hide');
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError(err.toString());
          });
      }

      function EditTitle(title) {
        FiestaSrvc.EditTitle(fiestaId, title)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              $scope.titleLoading = false;
              $scope.fiesta.title = data.title;
              angular.element('#editTitle').modal('hide');
              UtilsSrvc.ToastSuccess('Successfully edited title!');
              $route.reload();
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError(err.toString());
          });
      }


      function publishfiesta(publish) {
        FiestaSrvc.EditPublished($scope.fiesta._id, publish)
        .then(function (data) {
          UtilsSrvc.wait(1000, function () {
            $scope.fiesta.published = data.published;
            if(publish) UtilsSrvc.ToastSuccess('Published FIESTA!');
            else UtilsSrvc.ToastSuccess('Unpublished FIESTA!');
            $route.reload();
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
        });
      }
    }
  }
})();
