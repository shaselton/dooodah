;(function(){
	'use strict';

	dodah.controller('homeController',['$scope', '$rootScope', 'eventBriteAPI', '$routeParams', 'eventService', '$location', function($scope, $rootScope, eventBriteAPI, $routeParams, eventService, $location){
		var categories = ['Food', 'Art', 'Music', 'Sports'],
			results;

		$scope.categories = {};
		$scope.events = [];
		$scope.categories.header = [];
		$scope.category = "";
		$scope.upcomingEvents = [];

		$scope.categories.header.push({imgSrc:'img/category.png', title:'Foodie', url:'listing/Food'});
		$scope.categories.header.push({imgSrc:'img/art-cat.png', title:'Art Lover', url:'listing/Art'});
		$scope.categories.header.push({imgSrc:'img/concert-cat.png', title:'Concerts', url:'listing/Music'});
		$scope.categories.header.push({imgSrc:'img/sports-cat.png', title:'Sports Fan', url:'listing/Sports'});

		if( $routeParams.category ){
			eventBriteAPI.makeEventCall({keywords:$routeParams.category});
			$scope.category = $routeParams.category;
		}else{
			var rand = Math.floor(Math.random() * 4);
			// TODO: do we want random.
			eventBriteAPI.makeEventCall({keywords:"Activities"});
			$scope.category = "Events";
		}

		

		$rootScope.$on('eventbriteResults',function(msg, data){
			var truncatedBlurb,
				scrubbed,
				len = ( data.contents.events.length > 7 ) ? 7 : data.contents.events.length;

			results = data.contents;
			for( var i = 1; i < len; i++ ){ // offset by 1 (i = 1) bc the first object result returned is a "summary" and not actual data to be displayed.
				scrubbed = data.contents.events[i].event.description.replace(/<[^>]*>?/g, '');
				truncatedBlurb = ( scrubbed.length > 200 ) ? scrubbed.substring(0, 200) + '...' : scrubbed;
				$scope.events.push({
					date: data.contents.events[i].event.start_date.replace(' ', 'T'),
					sortDate : data.contents.events[i].event.start_date,
					title:{
						eventName: data.contents.events[i].event.title,
						//place:data.businesses[i].name,
						cityState:data.contents.events[i].event.venue.city + ', ' +data.contents.events[i].event.venue.country_code
					},
					imgSrc : data.contents.events[i].event.logo,
					blurb : truncatedBlurb,
					slug : data.contents.events[i].event.title.replace(/\s+/g, '-').toLowerCase(),
					//id : data.businesses[i].id
					obj: data.contents.events[i].event
				});
			};
			$scope.$apply();
			eventService.setEvents( $scope.events );
		});


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