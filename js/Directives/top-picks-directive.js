dodah.directive('topPicks', [function(){
	return{
		restrict: 'E',
		replace: true,
		scope:{
			picksData: '='
		},
		controller: function($scope){

			$scope.totalGoing = Math.floor( Math.random() * (500 - 100) + 100);

		},
		link:function(scope, element, attrs){
			scope.$watch('picksData', function(){
				if( !!scope.picksData ){
				}
			})
		},
		templateUrl: 'partials/top-picks-directive.html'
	}
}]);