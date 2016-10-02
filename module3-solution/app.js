(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

/******** DIRECTIVE AND DIRECTIVE CONTROLLER **********/
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}

/******** CONTROLLER ********/
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var narrowCtrl = this;
  narrowCtrl.criteriaSearch = "";
  narrowCtrl.nothingFound = false;

  narrowCtrl.getMatchedMenuItems = function(searchTerm){
    if(narrowCtrl.criteriaSearch == ""){
      narrowCtrl.nothingFound = true;
      narrowCtrl.found = [];
    }
    else{
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(response){
        narrowCtrl.found = response;
        narrowCtrl.nothingFound = false;
      })
      .catch(function(error){
        narrowCtrl.nothingFound = true;
        narrowCtrl.found = [];
      });
    }

  };

  narrowCtrl.removeItem = function (itemIndex) {
    narrowCtrl.found.splice(itemIndex,1);
  };
}



/******** SERVICES ********/
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){
      //process result and only keep items that match
      var foundItems = [];
      for (var i = 0, len = result.data.menu_items.length; i < len; i++) {
        if(result.data.menu_items[i].description.indexOf(searchTerm) != -1){
          //insert the item
          foundItems.push(result.data.menu_items[i]);
        }
      }

      if(foundItems.length == 0){
        throw new Error("Nothing found");
      }

      //return processed items
      return foundItems;

    });
  };

}

})();
