;(function(){
	'use strict';
	dodah.controller('categoryController',['$scope', '$rootScope', 'yelpAPI', '$routeParams', 'eventService', '$location', function($scope, $rootScope, yelpAPI, $routeParams, eventService, $location){
		var map;
		$scope.data = {};
		$scope.data.date = {};
		$scope.data.venue = {};
		$scope.events = [];

		$scope.init = function(){
			loadEvent();
		};

		var loadEvent = function(){
			var event = eventService.getEvent()
			if( angular.equals( {}, event ) ){
				$location.path('/');
			}
			$scope.otherEvents = eventService.getOtherEvents(),
			
			$scope.data.date = event.obj.start_date.replace(' ', 'T');
			$scope.data.image = event.imgSrc;
			$scope.data.title = event.obj.title;
			$scope.data.venue.title = event.obj.venue.name;
			$scope.mapOptions = setMaps( [event.obj.venue.latitude, event.obj.venue.longitude] );
			$scope.data.information = event.obj.description.replace(/<[^>]*>?/g, '').substring(0,600);
				//$scope.$apply();
				//getSimilarCategories( data.categories[0] ); // just taking the first suggestion offer they give	
		};
		

		var setMaps = function( mapInfo ){
			return{
				'lat/long': [ mapInfo[0], mapInfo[1] ]
			};
		};

		$scope.printAction = function(){
			window.print();
		};
		$scope.emailAction = function(){};

		var getSimilarCategories = function( category ){
			yelpAPI.makeSearchCall({term:category[0].split(' ')[0], limit:4});
			$scope.category = category[0].split(' ')[0];
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

		$scope.upcomingEvents = [];

		$scope.upcomingEvents.push({
			title:'One Direction - 2013 Tour',
			place:'Staples Center',
			date:'Aug 8, 2013 7:30 PM (Thursday)'
		});
		$scope.upcomingEvents.push({
			title:'X Games',
			place:'Irwindale Speedway',
			date:'Thu Aug 1 - Sun Aug 4'
		});
		$scope.upcomingEvents.push({
			title:'Hard Summer',
			place:'LA State Historic Park',
			date:'Sat Aug 3 - Sun Aug 4'
		});
		$scope.upcomingEvents.push({
			title:'Styx',
			place:'Pacific Amphitheatre',
			date:'Aug 2, 2013 8:15 PM '
		});
		$scope.upcomingEvents.push({
			title:'Pageant of the Masters',
			place:'Various locations in L.A.',
			date:'Until Sat Aug 31'
		});
		$scope.upcomingEvents.push({
			title:'H2O Music Festival',
			place:'LA State Historic Park',
			date:'Sat Aug 17'
		});
		$scope.upcomingEvents.push({
			title:'Jazz at LACMA',
			place:'Los Angeles County Museum of Art ',
			date:'Until Fri Nov 22'
		});
		$scope.upcomingEvents.push({
			title:'Off Sunset Festival',
			place:'Eagle LA ',
			date:'Until Sun Jul 7'
		});
		$scope.upcomingEvents.push({
			title:'Silver Lake Picture Show',
			place:'Sunset Triangle Plaza',
			date:'Until Thu Sep 5'
		});

		for(var i = 0; i < 3; i++ ){ // randomize the events a bit
			var index = Math.floor( Math.random() * ($scope.upcomingEvents.length - 1) );
			$scope.upcomingEvents.splice(index, 1);
		}

		shuffle( $scope.upcomingEvents );

		function shuffle(array) {
		  var currentIndex = array.length
		    , temporaryValue
		    , randomIndex
		    ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		}

	}]);
})();
