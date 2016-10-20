(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController',MyInfoController);

        MyInfoController.$inject = ['userPreferences'];
        function MyInfoController(userPreferences) {
          var $ctrl = this;
          $ctrl.userPreferences = userPreferences;
          $ctrl.userLogged = (userPreferences !== undefined);

          console.log("User Preferences: ", $ctrl.userPreferences);
          console.log("User Logged: ", $ctrl.userLogged)
        }

        })();
