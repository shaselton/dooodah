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
		},
		templateUrl: 'partials/event-directive.html'
	}
}]);