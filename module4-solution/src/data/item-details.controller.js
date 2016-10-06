(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['items','categoryCode'];
function ItemDetailController(items,categoryCode) {
  var itemDetailController = this;

  itemDetailController.categoryCode = categoryCode;
  itemDetailController.items = items.data.menu_items;
}

})();
