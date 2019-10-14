(() => {
	angular.module("app")
		     .controller("CustomizeCtrl", CustomizeCtrl);

	CustomizeCtrl.$inject = ["$scope", "$route", "FiestaSrvc", "UtilsSrvc", "AuthSrvc"];

	function CustomizeCtrl($scope, $route, FiestaSrvc, UtilsSrvc, AuthSrvc) {
		$scope.fiestas = []
		$scope.isAdmin = (AuthSrvc.GetAdmin().isAdmin) || false;

		FiestaSrvc.GetAllType()
		.then(function(data){
			$scope.fiestas = data;
		});

    // Drafts
    $scope.publishFiesta = function(fiesta, publish) {
      FiestaSrvc.EditPublished(fiesta._id, publish)
      .then(function (data) {
        UtilsSrvc.wait(1000, function () {
					fiesta.published = publish;
          if(publish) UtilsSrvc.ToastSuccess('Successfully published FIESTA!');
          else UtilsSrvc.ToastSuccess('Successfully unpublished FIESTA!');
        });
      })
      .catch(function (err) {
        UtilsSrvc.ToastError(err);
      });
    }

    $scope.removeFiesta = function(fiesta) {
      if(confirm('Delete this fiesta?')){
        FiestaSrvc.DeleteOne(fiesta._id)
        .then(function (data) {
          UtilsSrvc.wait(1000, function () {
					 fiesta._active = false;
           UtilsSrvc.ToastSuccess('Successfully deleted FIESTA!');
         });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
        });
      }
    };

		//  Trashed
		$scope.restoreFiesta = function(fiesta) {
			FiestaSrvc.RestoreOne(fiesta._id)
			.then(function(data){
				UtilsSrvc.wait(1000, function () {
					fiesta._active = true;
					UtilsSrvc.ToastSuccess('Successfully restored FIESTA!');
				});
			})
      .catch(function (err) {
        UtilsSrvc.ToastError(err);
      });
		};

		$scope.deleteFiesta = function(fiesta) {
      if(confirm('Delete this fiesta permanently?')) {
        FiestaSrvc.DeleteOnePermanently(fiesta._id)
  			.then(function(data){
  				UtilsSrvc.wait(1000, function () {
						$.each($scope.fiestas, function(i){
							if($scope.fiestas[i]){
								let id1 = $scope.fiestas[i]._id;
								let id2 = fiesta._id;
								if(id1 == id2) {
									$scope.fiestas.splice(i,1);
								}
							}
						});
  					UtilsSrvc.ToastSuccess('Successfully deleted FIESTA!');
  				});
  			})
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
        });
      }
		}
	}
})();
