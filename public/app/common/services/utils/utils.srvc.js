'use strict';

(() => {
  angular.module('app')
         .factory('UtilsSrvc', UtilsSrvc);

  UtilsSrvc.$inject = ['ngToast', '$window', '$log', '$timeout'];

  function UtilsSrvc(ngToast, $window, $log, $timeout) {
    var service = {};
    service.wait = wait;
    service.error = error;
    service.log = log;
    service.ToastError = ToastError;
    service.ToastSuccess = ToastSuccess;
    service.Ask = Ask;
    service.UpdateObjectInList = UpdateObjectInList;
    service.RemoveObjectInList = RemoveObjectInList;
    service.GetSummernoteOptions = GetSummernoteOptions;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
    * Timeout
    */
    function wait(time, work) {
      $timeout(work, time);
    }

    /**
    * Log
    */
    function error(message) {
      $log.error(message);
    }
    function log(message) {
      $log.log(message);
    }

    /**
    * Error toast
    */
    function ToastError(message) {
     ngToast.create({
       className: 'danger',
       content: message
     });
    }

    /**
    * Success toast
    */
    function ToastSuccess(message) {
      ngToast.create({
        className: 'success',
        content: message
      });
    }

    /**
    * Confirm message
    */
    function Ask(message) {
     return $window.confirm(message);
    }

    /**
    * Updates an object in a list with the changes given
    * objects expected to have _id for identification
    * @param {array} list
    * @param {string} objectId - id of object to update
    * @param {object} updates - changes for the object to update
    */
    function UpdateObjectInList(list, objectId, updates) {
      for (let i = 0; i < list.length; i++) {
        if(list[i]._id == objectId){
          for(let property in updates){
            list[i][property] = updates[property];
          }
          break;
        }
      }
    }

    /**
    * Removes an object in a list
    * objects expected to have _id for identification
    * @param {array} list
    * @param {string} objectId - id of object to delete
    */
    function RemoveObjectInList(list, objectId) {
      for (let i = 0; i < list.length; i++) {
        if(list[i]._id == objectId){
          list.splice(i, 1);
          break;
        }
      }
    }

    function GetSummernoteOptions() {
      let fonts = [
        // google fonts
        'Roboto', 'Open Sans', 'Lato', 'Raleway', 'Playfair Display',
        'Indie Flower', 'Dosis', 'Anton', 'Inconsolata', 'Lobster',
        'Pacifico', 'Gloria Hallelujah', 'Tangerine',
        // default
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
        'Tahoma', 'Times New Roman', 'Verdana'
      ];
      let options = {
        disableDragAndDrop: true,
        fontNames: fonts.sort(),
        fontNamesIgnoreCheck: [
          'Roboto', 'Open Sans', 'Lato', 'Raleway', 'Playfair Display',
          'Indie Flower', 'Dosis', 'Anton', 'Inconsolata', 'Lobster',
          'Pacifico', 'Gloria Hallelujah', 'Tangerine'
        ]
      };
      return options;
    }


  }

})();
