(function () {

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/main-categories.template.html',
      controller: 'CategoriesController as categoriesController',
      resolve:{
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categories.items', {
      url: '/items/{categoryId}',
      templateUrl: 'src/templates/items.template.html',
      controller: "ItemDetailController as itemDetailController",
      resolve:{
        items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryId);
        }],
        categoryCode: ['$stateParams', function($stateParams){
            return $stateParams.categoryId;
        }]
      }
    });
}

})();
