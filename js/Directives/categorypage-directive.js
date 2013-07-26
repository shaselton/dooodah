;(function(){
	'use strict';

	dodah.directive('categoryPage', [function(){
		return{
			restrict: 'E',
			controller: ['$scope', function( $scope ){
				$scope.$on('$destroy', function() {
					$scope.$body.removeClass('category-page');
		        });
			}],
			link:function(scope, element, attrs){
				scope.$body = angular.element( document.querySelector('body') );
				scope.$body.addClass('category-page');
			}

		}
	}]);


}());

