var dodah = angular.module('dooodah',[ 'googleMaps' ]);

dodah.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/home.html',   controller: 'homeController'}).
      when('/home/:category', {templateUrl: 'partials/home.html',   controller: 'homeController'}).
      when('/category/:yelpId', {templateUrl: 'partials/category.html',   controller: 'categoryController'}).
      otherwise({redirectTo: '/'});
}]);

/**
 * Message Handler on the root of the application
 */
dodah.run(['$rootScope', 'environment', function($rootScope, environment){

	$rootScope.console = function(){
		if( environment === 'development' ){
			console.log(arguments);
		}
	};
}]);

dodah.value('environment', 'development');