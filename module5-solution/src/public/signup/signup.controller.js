(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['SignUpService','MenuService'];
    function SignUpController(SignUpService,MenuService) {
        var $ctrl = this;
        $ctrl.invalidMenuItem = false;
        $ctrl.showMessage = false;

        //variable to hold the information
        $ctrl.userInformation = {};

        //Method to store the information of the user in the service
        $ctrl.signUpUser = function(){
            //store the information in the service.
            //control the inserted menu name exists.
            var menuItem = $ctrl.userInformation.menuItem;
            var promise = MenuService.getMenuItem(menuItem)
            .then(function(response){
                $ctrl.userInformation.userPreference = response;
            });

            //save all in the service for futher requests
            SignUpService.setUserPreferences($ctrl.userInformation);
            $ctrl.showMessage = true;
        };

        //Method to check that a menu item exists.
        $ctrl.checkMenuItem = function(){
            var menuItem = $ctrl.userInformation.menuItem;

            if(menuItem !== undefined && menuItem != ''){

                var promise = MenuService.getMenuItem(menuItem)
                .then(function(response){
                    $ctrl.invalidMenuItem = false;
                    return response;
                })
                .catch(function(error){
                    $ctrl.invalidMenuItem = true;
                });
            }
        }
    }

})();
