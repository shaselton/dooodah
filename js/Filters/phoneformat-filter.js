;(function(){
	'use strict';

	dodah.filter( 'phoneFormat', function(){
		return function(input) {
			if( !!input ){
				return "Phone ("+input.slice(0,3)+") "+input.slice(3,6)+"-"+input.slice(6,10);
			}
			
		};
	});

})();