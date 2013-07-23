;(function(){
	'use strict';

	dodah.controller('homeController',['$scope', '$rootScope', 'yelpAPI', '$routeParams', function($scope, $rootScope, yelpAPI, $routeParams){
		var categories = ['Food', 'Art', 'Music', 'Sports'];

		$scope.categories = {};
		$scope.events = [];
		$scope.categories.header = [];
		$scope.category = "";

		$scope.categories.header.push({imgSrc:'img/category.png', title:'Foodie', url:'home/Food'});
		$scope.categories.header.push({imgSrc:'img/art-cat.png', title:'Art Lover', url:'home/Art'});
		$scope.categories.header.push({imgSrc:'img/concert-cat.png', title:'Concerts', url:'home/Music'});
		$scope.categories.header.push({imgSrc:'img/sports-cat.png', title:'Sports Fan', url:'home/Sports'});

		if( $routeParams.category ){
			yelpAPI.makeSearchCall({term:$routeParams.category, limit:4});
			$scope.category = $routeParams.category;
		}else{
			var rand = Math.floor(Math.random() * 4);
			// TODO: do we want random.
			//yelpAPI.makeCall({term:categories[rand], limit:4});
			yelpAPI.makeSearchCall({limit:4});
			$scope.category = "Events";
		}

		

		$rootScope.$on('yelpResults',function(msg, data){

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