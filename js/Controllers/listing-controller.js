;(function(){
	'use strict';
	dodah.controller('listingController',['$scope', '$rootScope', '$routeParams', 'eventService', '$location', 'eventBriteAPI', function($scope, $rootScope, $routeParams, eventService, $location, eventBriteAPI){
		$scope.catButtons = [{name:'food'}, {name:'art lover'}, {name:'concerts'}, {name:'sports fan'}, {name:'cinema'}, {name:'theatre'}, {name:'all'}]
		$scope.events = [];
		var results;

		if( $routeParams.category ){
			var category = $routeParams.category;
			if( category === 'all' ){
				category = 'Events';
				$scope.category = '';
			}else{
				$scope.category = category;
			}
			eventBriteAPI.makeEventCall({keywords:category});
		}else{
			$location.path('/');
		}

		var setMaps = function( mapInfo ){
			return{
				'lat/long': [ mapInfo[0], mapInfo[1] ]
			};
		};

		$scope.updateListings = function( category ){
			$location.path('/listing/'+category);
		}

		$rootScope.$on('eventbriteResults',function(msg, data){
			var truncatedBlurb,
				scrubbed,
				len = data.contents.events.length;

			results = data.contents;
			for( var i = 1; i < len; i++ ){ // offset by 1 (i = 1) bc the first object result returned is a "summary" and not actual data to be displayed.
				scrubbed = data.contents.events[i].event.description.replace(/<[^>]*>?/g, '');
				truncatedBlurb = ( scrubbed.length > 400 ) ? scrubbed.substring(0, 400) + '...' : scrubbed;
				$scope.events.push({
					date: data.contents.events[i].event.start_date.replace(' ', 'T'),
					title:{
						eventName: data.contents.events[i].event.title,
						//place:data.businesses[i].name,
						cityState:data.contents.events[i].event.venue.city + ', ' +data.contents.events[i].event.venue.country_code
					},
					venueName: data.contents.events[i].event.venue.name,
					imgSrc : data.contents.events[i].event.logo,
					blurb : truncatedBlurb,
					slug : data.contents.events[i].event.title.replace(/\s+/g, '-').toLowerCase(),
					//id : data.businesses[i].id
					obj: data.contents.events[i].event,
					mapOptions : setMaps( [data.contents.events[i].event.venue.latitude, data.contents.events[i].event.venue.longitude] )
				});
			};
			$scope.$apply();
			eventService.setEvents($scope.events);
		});


		$scope.eventDetails = function( obj ){
			eventService.setEvent( obj );
			$location.path('/category' );
		}
	}]);
})();
