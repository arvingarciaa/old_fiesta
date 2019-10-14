'use strict';

(function () {
  angular.module('app')
        .controller('FeaturedTechCtrl', FeaturedTechCtrl);

	FeaturedTechCtrl.$inject = ['$scope', '$routeParams', 'FiestaSrvc', 'UtilsSrvc'];

	function FeaturedTechCtrl($scope, $routeParams, FiestaSrvc, UtilsSrvc) {

    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    $scope.sector = [];
    $scope.tech = {};
    $scope.focusTech = {
      name: '',
      image: {path:'', credits: ''},
      commodity: 'Abaca',
      description: '',
      benefits: [],
      partnerInstitutions: [],
      targetBeneficiaries: [],
      locations: []
    };

    $scope.technologies = [];
    $scope.menu = [true, false, false, false, false, false, false];
    $scope.technology = {};
    initTechnology();
    let oldComm = '';

    FiestaSrvc.GetAllInstitutions($routeParams.fiestaId)
      .then(function (institutions) {
        $scope.institutions = institutions;
      });
    FiestaSrvc.GetAllLocations($routeParams.fiestaId)
      .then(function (locations) {
        $scope.locations = locations;
      });
    FiestaSrvc.GetAllBeneficiaries($routeParams.fiestaId)
      .then(function (beneficiaries) {
        $scope.beneficiaries = beneficiaries;
      });
    FiestaSrvc.GetOne($routeParams.fiestaId)
      .then(function (fiesta) {
        $scope.fiesta = fiesta;
      });
    FiestaSrvc.GetAllTechnology($routeParams.fiestaId)
      .then(function (technologies) {
        $scope.technologies = technologies;
        classifyTechnologies(technologies);
      });

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.showMenu = showMenu;
    $scope.toggleMenu = toggleMenu;
    $scope.AddTechnology = AddTechnology;
    $scope.EditTechnology = EditTechnology;

    function initTechnology() {
      $scope.technology = {
        commodity: '',
        image: {input: null, credits: ''},
        name: '',
        description: '',
        benefits: [],
        partnerInstitutions: [],
        targetBeneficiaries: [],
        locations: []
      };
    }

    function AddTechnology() {
      if($scope.technology.commodity.trim() == ''){
        UtilsSrvc.ToastError('Please specify the commodity.');
        showMenu(0);
      }
      else if ($scope.technology.name.trim() == '') {
        UtilsSrvc.ToastError('Please specify the name.');
        showMenu(1);
      }
      else if ($scope.technology.description.trim() == '') {
        UtilsSrvc.ToastError('Please description the name.');
        showMenu(1);
      }
      else if ($scope.technology.image.input == null) {
        UtilsSrvc.ToastError('Please upload an image the name.');
        showMenu(2);
      }
      else if ($scope.technology.image.credits.trim() == '') {
        UtilsSrvc.ToastError('Please enter some credits for the image.');
        showMenu(2);
      }
      else {
        $scope.techLoading = true;
        FiestaSrvc.AddTechnology($routeParams.fiestaId, $scope.technology)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              $scope.techLoading = false;
              UtilsSrvc.ToastSuccess('Technology was added!');
              initTechnology();
              add(data);
              showMenu(0);
              angular.element('#editTechnology').modal('hide');
            });
          })
          .catch(function (err) {
            $scope.techLoading = false;
            UtilsSrvc.ToastError("Something went wrong!");
            UtilsSrvc.error(err);
          });
      }
    }

    function EditTechnology() {
      if($scope.technology.commodity.trim() == ''){
        UtilsSrvc.ToastError('Please specify the commodity.');
        showMenu(0);
      }
      else if ($scope.technology.name.trim() == '') {
        UtilsSrvc.ToastError('Please specify the name.');
        showMenu(1);
      }
      else if ($scope.technology.description.trim() == '') {
        UtilsSrvc.ToastError('Please description the name.');
        showMenu(1);
      }
      else if ($scope.technology.image.credits.trim() == '') {
        UtilsSrvc.ToastError('Please enter some credits for the image.');
        showMenu(2);
      }
      else {
        $scope.techLoading = true;
        FiestaSrvc.EditTechnology($routeParams.fiestaId, $scope.technology)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              $scope.techLoading = false;
              UtilsSrvc.ToastSuccess('Technology was updated!');
              UtilsSrvc.RemoveObjectInList($scope.technologies, data._id);
              UtilsSrvc.RemoveObjectInList($scope.tech[oldComm], data._id);
              add(data);
              showMenu(0);
              angular.element('#editTechnology').modal('hide');
            });

          })
          .catch(function (err) {
            $scope.techLoading = false;
            UtilsSrvc.ToastError("Something went wrong!");
            UtilsSrvc.error(err);
          });
      }
    }

    function showMenu(index) {
      if($scope.menu[index]) return;
      angular.element('.crumbs').removeClass('active');
      $scope.menu = [false, false, false, false, false, false, false];
      $scope.menu[index] = true;
      angular.element('.'+index).addClass('active');
    }

    function toggleMenu(action) {
      let active;
      for (var i = 0; i < $scope.menu.length; i++) {
        if($scope.menu[i]){
          active = i;
          break;
        }
      }
      if(action == 'prev' && active != 0){
        showMenu(active-1);
      }
      else if(action == 'next' && active != $scope.menu.length-1){
        showMenu(active+1);
      }
    }

    $scope.focus = function (tech) {
      angular.copy(tech, $scope.focusTech);
    };

    $scope.add = function () {
      $scope.updateDetails = false;
      initTechnology();
    }

    $scope.point = function (tech) {
      $scope.techPointer = tech;
    }

    $scope.edit = function (tech) {
      showMenu(0);
      $scope.updateDetails = true;
      oldComm = tech.commodity;
      angular.copy(tech, $scope.technology);
    }

    $scope.DeleteTechnology = function (tech) {
      if (UtilsSrvc.Ask('Delete this technology?')) {
        FiestaSrvc.DeleteTechnology($routeParams.fiestaId, tech._id)
          .then(function (success) {
            UtilsSrvc.ToastSuccess(success.message);
            UtilsSrvc.RemoveObjectInList($scope.technologies, tech._id);
            UtilsSrvc.RemoveObjectInList($scope.tech[tech.commodity], tech._id);
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
    }

    $scope.EditImage = function (inputImage, techPointer) {
      if (!inputImage) {
        UtilsSrvc.ToastError('No image uploaded!');
        return;
      }
      $scope.loading = true;
      let image = {
        '_id': techPointer._id.toString(),
        'inputImage': inputImage
      };
      FiestaSrvc.UpdateTechImage($routeParams.fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            UtilsSrvc.ToastSuccess('Image was updated!');
            $scope.loading = false;
            techPointer.image.path = data.image.path;
            angular.element('#editImage').modal('hide');
            $scope.inputImage = null;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError('Something went wrong!');
          UtilsSrvc.error(err);
        });
    }




    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    function add(data) {
      $scope.technologies.push(data);
      if(!$scope.tech.hasOwnProperty(data.commodity) || $scope.tech[data.commodity].constructor != Array)
        $scope.tech[data.commodity] = [];
      $scope.tech[data.commodity].push(data);
    }
    function classifyTechnologies (technologies) {
      FiestaSrvc.GetAllSector()
        .then(function (sectors) {
          $scope.sector = sectors;
          classify();
        })
        .catch(function (err) {
          UtilsSrvc.error(err);
        });

      function classify() {

        for (var i = 0; i < technologies.length; i++) {
          if(!$scope.tech.hasOwnProperty(technologies[i].commodity) || $scope.tech[technologies[i].commodity].constructor != Array)
            $scope.tech[technologies[i].commodity] = [];
          $scope.tech[technologies[i].commodity].push(technologies[i]);
        }
      }
    }
  }
})();
