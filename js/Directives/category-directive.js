dodah.directive('headerCategory', [function(){
	return{
		restrict: 'E',
		replace: true,
		scope:{
			categoryData: '='
		},
		controller: function($scope){

		},
		link:function(scope, element, attrs){
			scope.$watch('categoryData', function(){
				if( scope.categoryData === undefined ){
					return false;
				}
				scope.title = scope.categoryData.title;
				scope.imgSrc = scope.categoryData.imgSrc;
			});
		},
		templateUrl: 'partials/category-directive.html'
	}
}]);