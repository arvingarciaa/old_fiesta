"use strict";

(() => {
  angular.module("app")
         .factory("PageHandlerSrvc", PageHandlerSrvc);

  function PageHandlerSrvc() {
    var service = {};
    service.PageHandler = PageHandler;
    return service;

    /***************************************************************************
     @INFO: Services
    ***************************************************************************/
    /**
     * Class for handling page navigations
     * - @param {number} perPage
     * - @param {array} list
     */
     function PageHandler(perPage, list){
       this.fiestaPerPage = perPage;
       this.fiestaList = list;
       // initialize current page and get total number of pages
       this.currentPage = 1;
       this.numPages = Math.ceil(this.fiestaList.length / this.fiestaPerPage);

       /** Change page using @param {int} page */
       this.changePage = function (page) {
         if (page < 1) page = 1;
         if (page > this.numPages) page = this.numPages;
         var list = [];
         for (var i = (page-1) * this.fiestaPerPage; i < (page * this.fiestaPerPage) && i < this.fiestaList.length; i++)
           list.push(this.fiestaList[i]);
         let fiestas = this.putOnRows(list);
         if(this.currentPage != page)
           this.deactivateButton(this.currentPage);
         this.activateButton(page);
         this.currentPage = page;
         return fiestas;
       };

       /** Generates a rows with fiestas from @param {array} fiestas */
       this.putOnRows = function (fiestas) {
         let rowsWithFiesta = [];
         for (var i = 0; i < Math.ceil(fiestas.length / 4)+1; i++) {
           var list = [];
           for (var j = 0; j < 4; j++) {
             list = fiestas.splice(0, 4);
             rowsWithFiesta.push(list);
           }
         }
         return rowsWithFiesta;
       };

       /** Removes active class in button with id #page_{page} from @param {int} oldPage */
       this.deactivateButton = function (oldPage) {
         if(angular.element("#page_"+oldPage).hasClass("active")) {
           angular.element("#page_"+oldPage).removeClass("active");
         }
       };

      /** Adds active class in button with id #page_{page} from @param {int} newPage */
       this.activateButton = function (newPage) {
         angular.element("#page_"+newPage).addClass("active");
       };

       /** Checks if possible to go to the previous page */
       this.canPrevPage = function () {
         return this.currentPage > 1;
       };

       /** Goes to the previous page */
       this.prevPage = function () {
         if (this.canPrevPage()) {
           return this.changePage(this.currentPage - 1);
         }
       };

       /** Checks if possible to go to the next page */
       this.canNextPage = function () {
         return this.currentPage < this.numPages;
       };

       /** Goes to the next page */
       this.nextPage = function () {
         if (this.canNextPage()) {
           return this.changePage(this.currentPage + 1);
         }
       };

       /** Initializes the pageHandler to page 1 */
       this.initialize = function () {
         if(this.fiestaList.length == 0)
           return [];
         else
           return this.changePage(1);
       };

       /** Changes the current fiestaList with @param {array} newList */
       this.changeFiestaList = function (newList) {
         this.fiestaList = newList;
         this.numPages = Math.ceil(this.fiestaList.length / this.fiestaPerPage);
         return this.initialize();
       };

       /** Returns the current fiestaList */
       this.getFiesta = function () {
         return this.fiestaList;
       };
     }

  }
})();
