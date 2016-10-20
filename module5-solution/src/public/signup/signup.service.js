(function () {
    "use strict";

    angular.module('public')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['$http', 'ApiPath'];
    function SignUpService($http, ApiPath) {
        var service = this;

        //to store the user preferences
        //will be used later on in the getUserPreferences method
        service.setUserPreferences = function(userSignUpPreferences){
          service.userSignUpPreferences = userSignUpPreferences;
        };

        //to retrieve the user preferences.
        //will return undefined if the user hasn't signed up yet
        service.getUserPreferences = function(){
          return service.userSignUpPreferences;
        };
    }
})();
