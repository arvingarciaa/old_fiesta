"use strict";

(() => {
  var app = angular.module("app",
  [
    "vAccordion",
    "ngAnimate",
    "ngRoute",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngTagsInput",
    "ngToast",
    "ngFileUpload",
    "ngYoutubeEmbed",
    "ngMap",
    "angular-jwt",
    "summernote",
    "angular-loading-bar",
    'angularUtils.directives.dirPagination',
    "angular-ladda",
    "angularMoment",
    "ngCookies",
    'monospaced.elastic',
    'angularMoment'
  ]);

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/fiesta", {
      "templateUrl" : "/app/user/fiesta/fiesta.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/user/fiesta/directives/fiesta-carousel/fiesta-carousel.js",
            "app/user/fiesta/directives/fiesta-list/fiesta-list.js",
            "app/user/fiesta/controllers/fiesta/fiesta.ctrl.js",
            "app/common/services/database/fiesta.srvc.js"
          ]
        });
      }]}
    })
    .when("/fiesta/:fiestaId", {
      "templateUrl" : "/app/user/specific-fiesta/specific-fiesta.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/user/specific-fiesta/directives/specific-fiesta/specific-fiesta.js",
            "app/user/specific-fiesta/controllers/specific-fiesta.ctrl.js",
            "app/common/services/database/fiesta.srvc.js"
          ]
        });
      }]}
    })
    .when("/fiesta/:fiestaId/:tabSlug", {
      "templateUrl" : "/app/user/specific-fiesta/specific-fiesta.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/user/specific-fiesta/directives/specific-fiesta/specific-fiesta.js",
            "app/user/specific-fiesta/controllers/specific-fiesta.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-schedule.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-feattech.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-posters.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-awards.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-media.ctrl.js",
            "app/user/specific-fiesta/controllers/specific-fiesta-blogs.ctrl.js",
            // "app/user/specific-fiesta/controllers/specific-fiesta-more.ctrl.js",
            "app/common/services/database/fiesta.srvc.js"
          ]
        });
      }]}
    })
    /****************************************************
     *                      ADMIN                       *
     ****************************************************/
     .when("/admin/", {
       "templateUrl" : "/app/admin/admin.view.ejs",
       resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
         return $ocLazyLoad.load({
           files: [
            "app/admin/controllers/admin.ctrl.js",

            "app/admin/directives/manage-fiesta/directives/manage-fiesta-panel/manage-fiesta-panel.js",
            "app/admin/directives/manage-fiesta/directives/fiesta-panel-heading/fiesta-panel-heading.js",
            "app/admin/directives/manage-fiesta/directives/manage-fiesta-list/manage-fiesta-list.js",
            "app/admin/directives/manage-fiesta/directives/list-view-options/list-view-options.js",
            "app/admin/directives/manage-fiesta/directives/create-fiesta-modal/create-fiesta-modal.js",
            "app/admin/directives/manage-fiesta/directives/commodity-filter-modal/commodity-filter-modal.js",

            "app/admin/directives/manage-fiesta/controllers/create-fiesta-modal/create-fiesta-modal.ctrl.js",
            "app/admin/directives/manage-fiesta/controllers/manage-fiesta-list/manage-fiesta-list.ctrl.js",

            "app/admin/directives/manage-fiesta/services/create-fiesta-modal/create-fiesta-modal.srvc.js",
            "app/admin/directives/manage-fiesta/services/filter-fiesta/filter-fiesta.srvc.js",
            "app/admin/directives/manage-fiesta/services/manage-fiesta-list/manage-fiesta-list.srvc.js",
            "app/admin/directives/manage-fiesta/services/page-handler/page-handler.srvc.js",
            "app/admin/directives/manage-fiesta/services/sort-fiesta/sort-fiesta.srvc.js",
          ]
        });
      }]}
    })
    .when("/login", {
      "templateUrl" : "/app/login/login.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/login/controllers/login.ctrl.js",
            ]
        });
      }]}
    })
    .when("/logout", {
      "templateUrl" : "/app/logout/logout.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
          "app/logout/controllers/logout.ctrl.js",
          ]
        });
      }]}
    })
    .when("/forgot-password", {
      "templateUrl" : "/app/forgot-password/forgot-password.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
          "app/forgot-password/controllers/forgot-password.ctrl.js",
          ]
        });
      }]}
    })
    .when("/admin/settings", {
      "templateUrl" : "/app/admin/directives/settings/settings.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "/app/admin/directives/settings/controllers/settings.ctrl.js"
            ]
        });
      }]}
    })
    .when("/admin/manage/:fiestaId", {
      "templateUrl" : "/app/admin/directives/manage-specific-fiesta/manage-specific-fiesta.view.ejs",
      "reloadOnSearch": false,
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/directives/manage-specific-fiesta/controllers/manage-specific-fiesta/manage-specific-fiesta.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/fiesta-menu-panel/fiesta-menu-panel.js",
            "app/admin/directives/manage-specific-fiesta/directives/fiesta-menu-panel/edit-picture/edit-picture.js",
            "app/admin/directives/manage-specific-fiesta/directives/multi-view-panel/multi-view-panel.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/about/about.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/about.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-commodity/edit-commodity.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-consortium/edit-consortium.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-date/edit-date.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-description/edit-description.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-region/edit-region.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-title/edit-title.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-venue/edit-venue.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-vicinity-map/edit-vicinity-map.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/add-google-map/add-google-map.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-magazine/edit-magazine.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/activities/activities.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/activities/activities.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/activities/activity-modal/activity-modal.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/awards/awards.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/awards/awards.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/awards/award-modal/award-modal.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/executive/executive.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/executive/executive.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/featured-technologies/featured-technologies.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/featured-technologies.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/modals/edit-tech/edit-tech.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/modals/view-tech/view-tech.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/more/more.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/more/more.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/more/modals/edit-more/edit-more.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/more/modals/view-more/view-more.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/photos/photos.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/photos/photos.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/photos/photo-modal/photo-modal.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/posters/posters.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/posters/posters.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/posters/poster-modal/poster-modal.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/videos/videos.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/videos/videos.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/videos/video-modal/video-modal.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/blogs/blogs.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/blogs.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/modals/view-blog/view-blog.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/blogs/modals/edit-blog/edit-blog.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/profiles/profiles.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/profiles.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/modals/edit-profile/edit-profile.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/modals/view-profile/view-profile.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/content/content.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/content/content.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/content/modals/view-content/view-content.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/content/modals/edit-content/edit-content.js",

            "app/admin/directives/manage-specific-fiesta/controllers/menu-items/events/events.ctrl.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/events/events.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/events/modals/view-event/view-event.js",
            "app/admin/directives/manage-specific-fiesta/directives/menu-items/events/modals/edit-event/edit-event.js"
          ]
        });
      }]}
    })
    .when("/admin/accounts", {
       "templateUrl" : "/app/admin/admin.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/controllers/admin.ctrl.js",
            "app/admin/directives/manage-account/controllers/manage-account.ctrl.js",
            "app/admin/directives/manage-account/directives/messages/directives/messages.js",
            "app/admin/directives/manage-account/directives/accounts/directives/accounts.js"
          ]
        });
      }]}
    })
    .when("/admin/comments", {
       "templateUrl" : "/app/admin/admin.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/controllers/admin.ctrl.js",
            "app/admin/directives/manage-comments/controllers/manage-comments.ctrl.js",
            "app/admin/directives/manage-comments/directives/comments-fiesta/comments-fiesta.js",
            "app/admin/directives/manage-comments/directives/comments-feattech/comments-feattech.js",
            "app/admin/directives/manage-comments/directives/comments-photo/comments-photo.js",
          ]
        });
      }]}
    })
    .when("/admin/analytics", {
       "templateUrl" : "/app/admin/admin.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/controllers/admin.ctrl.js",
          ]
        });
      }]}
    })
    .when("/admin/customize", {
       "templateUrl" : "/app/admin/admin.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/controllers/admin.ctrl.js",
            "app/admin/directives/customize/controllers/customize.ctrl.js",
            "app/admin/directives/customize/directives/customize-specific/customize-specific.js",
            "app/admin/directives/customize/controllers/customize-specific/customize-specific.ctrl.js"
          ]
        });
      }]}
    })
    .when("/admin/customize/:page", {
       "templateUrl" : "/app/admin/directives/customize/directives/customize-specific/customize-specific.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/admin/directives/customize/directives/customize-specific/customize-specific.js",
            "app/admin/directives/customize/controllers/customize-specific/customize-specific.ctrl.js"
          ]
        });
      }]}
    })
    //  TECHNOLOGY
    .when("/technology", {
      "templateUrl" : "/app/user/technology/technology.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/user/technology/directives/technology-carousel/technology-carousel.js",
            "app/user/technology/directives/technology-list/technology-list.js",
            "app/user/technology/controllers/technology/technology.ctrl.js",
            "app/common/services/database/technology.srvc.js"
          ]
        });
      }]}
    })
    .when("/technology/admin", {
      "templateUrl" : "/app/user/technology-admin/technology-admin.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/user/technology-admin/controllers/technology-admin.ctrl.js",
            "app/common/services/database/technology.srvc.js"
          ]
        });
      }]}
    })
    .when("/lost", {
      "templateUrl" : "/app/lost/lost.view.ejs",
      resolve: { lazy: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: [
            "app/lost/controllers/lost.ctrl.js",
            ]
        });
      }]}
    })
    .when("/",{
      redirectTo: "/technology"
    })
    .otherwise({
      redirectTo: "/lost"
    });
    $locationProvider.html5Mode(true);
  });

  // @NOTE: for angular toasts
  app.config(["ngToastProvider", function (ngToastProvider) {
    ngToastProvider.configure({
      animation: "fade"
    });
  }]);
  // @NOTE: for angular toasts
  app.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])

})();
