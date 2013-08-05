;(function(){
	'use strict';

	dodah.directive( 'flipper', function(){
		return{
			restrict: 'E',
			transclude: true,
			link: function( scope, element, attrs ){
				$(window).resize(function(){
					var size = $(window).width();
					if( size < 1140 ){ // show 3
						
					}
				});
			}
		}
	});
})();