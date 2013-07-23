;(function(){
	'use strict';
	dodah.directive( 'googleMaps', [ function() {
		return{
			restrict: 'E',
			replace: true,
			scope:{
				options: '='
			},
			template: '<div id="map-canvas"></div>',
			controller: [ '$scope', '$element', 'googleMapsService', function( $scope, $element, googleMapsService ){
				$scope.addMap = function(){
					googleMapsService.getMap( $scope.options, 'google-map' );
				};
			}],
			link: function(scope, element, attrs){
				scope.$watch( 'options', function(){
					if( !!scope.options ){
						scope.addMap();
					}
				});
			}
		};

	}]);
})();