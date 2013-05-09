dodah.directive('eventSummary', [function(){
	return{
		restrict: 'E',
		replace: true,
		scope:{
			eventData: '='
		},
		controller: function($scope){

		},
		link:function(scope, element, attrs){
			scope.$watch('eventData', function(){
				if( scope.eventData === undefined ){
					return false;
				}				
			});
		},
		templateUrl: 'partials/event-directive.html'
	}
}]);