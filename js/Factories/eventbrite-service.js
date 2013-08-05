;(function(){
	'use strict';

	dodah.factory('eventBriteAPI',[ '$q', '$rootScope', function( $q, $rootScope ){
		var isValid = function( name ){
			return ( yelp[name] !== undefined );
		};

		var eventBriteCall = function( params ){
			var pEvent	 = 	$q.defer(),
							auth_headers = {};

			params.app_key='V2GFJHBPNQVH3SLUPA';
			params.city='Fullerton';
			params.within=40;

			var success = function(data){
				pEvent.resolve(data);
				$rootScope.$broadcast('eventbriteResults', data);
			};

			var failure = function(data){
				console.log('failure', data);
				pEvent.reject(data);
			}

			$.ajax({
			  'url': "https://developer.eventbrite.com/json/event_search",
			  'cache': true,
			  'data': params,
			  'dataType': 'jsonp',
			  'headers': auth_headers,
			  'success': success,
			  'error': failure,
			  'beforeSend': function(xhrObj){
		        xhrObj.setRequestHeader("Content-Type","application/json");
		        xhrObj.setRequestHeader("Accept","application/json");
		      },
			});

			return pEvent.promise;
		};

		return{
			makeEventCall: function( params ){
				return eventBriteCall( params );
			}
		};
	}]);
})();