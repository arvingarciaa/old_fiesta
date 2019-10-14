"use strict";

(function () {
  angular.module("app")
         .factory("TechnologySrvc", TechnologySrvc);

  TechnologySrvc.$inject = ['$http', '$q', '$log', 'AuthSrvc'];

  function TechnologySrvc($http, $q, $log, AuthSrvc) {
    let apiUrl = 'https://technology-dashboard-api.herokuapp.com';
    let dbUrl = 'api';
    var service = {};

    service.GetAll = GetAll;
    service.GetOwners = GetOwners;
    service.GetGenerators = GetGenerators;
    service.Search = Search;
    service.find_one = find_one;
    service.GetOneCms = GetOneCms;
    service.EditCmsHeader = EditCmsHeader;
    service.EditCmsList = EditCmsList;
    service.EditCmsSlider = EditCmsSlider;
    service.AddSliderPhoto = AddSliderPhoto;
    service.StoreRequest = StoreRequest;
    service.GetRequests = GetRequests;
    service.ChangeReqStatus = ChangeReqStatus;
    return service;

    function GetAll() {
      let deferred = $q.defer();

      $http.get(apiUrl+'/technologies?page=1&limit=1000000')
        .then(function (response) {
          deferred.resolve(response.data.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetOwners(id) {
      let deferred = $q.defer();
      $http.get(apiUrl+'/owner-details/'+id)
        .then(function (response) {
          deferred.resolve(response.data.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetGenerators(id) {
      let deferred = $q.defer();
      $http.get(apiUrl+'/generator-details/'+id)
        .then(function (response) {
          deferred.resolve(response.data.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function Search(key) {
      let deferred = $q.defer();
      $http.get(apiUrl + '/technologies/search/'+key+'?page=1&limit=1000000')
       .then(function(data) {
         deferred.resolve(data.data.data);
       }, function(err){
         deferred.reject(err);
       });
      return deferred.promise;
    }

    function find_one(id) {
      let deferred = $q.defer();
      $http.get(apiUrl + '/technologies/'+id)
       .success(function(data) {
         deferred.resolve(data.data);
       }, function(err){
         deferred.reject(err);
       });
       return deferred.promise;
    }

    function GetOneCms(page) {
      let deferred = $q.defer();

      if(!page || page.trim() == ''){
        $log.error('No page submitted!');
        deferred.reject('No page submitted!');
        return deferred.promise;
      }

      $http.get(dbUrl+'/tech_cms/'+page)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsHeader(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/tech_cms/'+page+'/update-header';

      let header = {
        'header': data
      };

      $http.put(url, header)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsList(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/tech_cms/'+page+'/update-list';

      let list = {
        'sort': {
          'show': data.sort.show,
          'options': {
            'title': data.sort.options.title,
            'industry': data.sort.options.industry,
            'year': data.sort.options.year,
            'commodity': data.sort.options.commodity
          }
        },
        'filter': {
          'show': data.filter.show,
          'options': {
            'industry': data.filter.options.industry,
            'year': data.filter.options.year,
            'commodity': data.filter.options.commodity
          }
        },
        'counter': data.counter,
        'cards': {
          'option': data.cards.option,
          'order': data.cards.order,
        },
        'pagination': {
          'pageSize': data.pagination.pageSize,
          'currentPage': data.pagination.currentPage
        }
      };
      $http.put(url, list)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsSlider(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/tech_cms/'+page+'/update-slider';

      let slider = {
        'slider': data
      };

      $http.put(url, slider)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddSliderPhoto(page, picture) {
      let deferred = $q.defer();
      let data = new FormData();
      data.append('photo-slider-image', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/tech_cms/'+page+'/add-slider', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function StoreRequest(data, email) {
      let deferred = $q.defer();
      let url = dbUrl+'/technology/'+data._id+'/request';

      let request = {
        'techId': data._id,
        'title': data.title,
        'email': email
      };

      $http.post(url, request)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;

    }

    function GetRequests() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/technology/request')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function ChangeReqStatus(id, request) {
      let deferred = $q.defer();
      let url = dbUrl+'/technology/'+id+'/request';

      let requestData = {
        'techId': request._id,
        'title': request.title,
        'email': request.email,
        'status': request.status
      };

      $http.put(url, requestData)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;

    }
  }
})();
