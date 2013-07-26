;(function(){
	'use strict';
	dodah.controller('categoryController',['$scope', '$rootScope', 'yelpAPI', '$routeParams', function($scope, $rootScope, yelpAPI, $routeParams){
		var map;
		$scope.data = {};
		$scope.data.date = {};
		$scope.data.venue = {};
		$scope.events = [];

		$scope.init = function(){
			makeBusinessCall();
		};

		var makeBusinessCall = function(){
			yelpAPI.makeBusinessCall( $routeParams.yelpId );
			$rootScope.$on('yelpBusinessResults',function(msg, data){
				$scope.data.image = data.image_url;
				$scope.data.title = data.name;
				$scope.data.venue.title = data.name;
				$scope.data.venue.phone = data.phone;
				$scope.data.venue.price = "??? <unknown> TODO: change me!";
				$scope.mapOptions = setMaps( data.location );
				$scope.data.information = data.snippet_text;
				$scope.$apply();
				getSimilarCategories( data.categories[0] ); // just taking the first suggestion offer they give				
			});
		};
		

		var setMaps = function( mapInfo ){
			return{
				'lat/long': [ mapInfo.coordinate.latitude, mapInfo.coordinate.longitude ]
			};
		};

		$scope.printAction = function(){};
		$scope.emailAction = function(){};

		var getSimilarCategories = function( category ){
			yelpAPI.makeSearchCall({term:category[0].split(' ')[0], limit:4});
		};

		$rootScope.$on('yelpResults',function(msg, data){
			$scope.events = [];
			for( var i = 0, len = data.businesses.length; i < len; i++ ){
				$scope.events.push({
					date:{
						day:'fri',
						dateFormat: '6/14',
						time: '1 pm'
					},
					title:{
						eventName:data.businesses[i].name,
						place:data.businesses[i].name,
						cityState:data.businesses[i].location.city + ', ' +data.businesses[i].location.state_code
					},
					imgSrc : data.businesses[i].image_url,
					blurb : data.businesses[i].snippet_text,
					id : data.businesses[i].id
				});
			}
			$scope.$apply();
		});

	}]);
})();
