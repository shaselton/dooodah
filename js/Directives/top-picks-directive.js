dodah.directive('topPicks', [function(){
	return{
		restrict: 'E',
		replace: true,
		scope:{
			picksData: '='
		},
		controller: function($scope){
		},
		link:function(scope, element, attrs){
		},
		templateUrl: 'partials/top-picks-directive.html'
	}
}]);