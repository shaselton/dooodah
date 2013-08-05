dodah.directive('eventSummary', [ '$location', 'eventService', function( $location, eventService ){
	return{
		restrict: 'E',
		replace: true,
		scope:{
			eventData: '='
		},
		controller: function($scope){
			$scope.eventDetails = function( obj ){
				eventService.setEvent( obj );
				$location.path('/category' );
			}
		},
		link:function(scope, element, attrs){
		},
		templateUrl: 'partials/event-directive.html'
	}
}]);