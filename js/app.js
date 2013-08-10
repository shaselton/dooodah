var dodah = angular.module('dooodah',[ 'googleMaps' , 'calendarfiddle']);

dodah.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/home.html',   controller: 'homeController'}).
      when('/home/:category', {templateUrl: 'partials/home.html',   controller: 'homeController'}).
      when('/category/', {templateUrl: 'partials/category.html',   controller: 'categoryController'}).
      when('/listing/:category', {templateUrl: 'partials/listing.html', controller: 'listingController'}).
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