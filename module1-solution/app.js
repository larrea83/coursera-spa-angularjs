(function () {
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope','$filter'];
function LunchCheckController ($scope,$filter) {

  $scope.foodList = "";
  $scope.foodMessage = "";
  $scope.customStyle = "";

  $scope.checkFood = function () {
    var finalMessage = "";

    if($scope.foodList == ""){
      finalMessage = "Please enter data first";
      $scope.customStyle = "red";
    }
    else{
      //split the input
      var arrayOfStrings = $scope.foodList.split(",");
      $scope.customStyle = "green";

      if(arrayOfStrings.length <= 3){
        finalMessage = "Enjoy!";
      }
      else{
        finalMessage = "Too much!";
      }
    }

    $scope.foodMessage = finalMessage;

  };
}

})();
