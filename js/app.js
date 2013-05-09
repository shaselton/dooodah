var dodah = dodah || angular.module('dooodah',[]);

dodah.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/home.html',   controller: 'homeController'}).
      otherwise({redirectTo: '/'});
}]);