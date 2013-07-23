;(function(){
	'use strict';

	angular.module( 'googleMaps', []).
	factory( 'googleMapsService', [ function(){
		var map;

		var generateMap = function( options, selector ) {

		  	var mapOptions = {
				    zoom: 15,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
		  		},
		  		selector = selector;

		  	options = normalizeOptions( options );
		  	angular.extend( mapOptions, options );

		  	if( !selector ){
				selector = 'map-canvas';
		  	}

			map = new google.maps.Map(document.getElementById( selector ), mapOptions);
			new google.maps.Marker({ position: options.center,  map: map,  title: '' });
		}

		var normalizeOptions = function( options ){
			var googleNormalized = {};

			for( var attribute in options ){
				console.log(attribute, options[attribute]);
				switch( attribute ){
					case 'lat/long':
						googleNormalized['center'] = new google.maps.LatLng( options[attribute][0], options[attribute][1] ) ;
						break;
					default:
						googleNormalized[attribute] = options[attribute];
						break;
				}
			}

			return googleNormalized;
		}

		return{
			getMap:function(options){
				return generateMap( options );
			}
		};


	
	}]);
})();