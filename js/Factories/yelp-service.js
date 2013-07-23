
	dodah.factory( 'yelpAPI', [ '$http', '$rootScope', '$q', function( $http, $rootScope, $q ) {

		// TODO: server-side calls are a must if to go live!
		var yelpKey = {
			consumerKey: "Q3q81GK2NWnvuRDZMHRYZg", 
			consumerSecret: "8deNRgeBiTsVClfQB-r4ZsAyYyY",
			accessToken: "UXb5hozA4KDJf5ts1kymggIVD0XquOa-",
			// TODO: remove this...
			accessTokenSecret: "vYCoHwv91Ly_wKsl6Kl1WnfnTi4",
			makeCall: { 
				signatureMethod: "HMAC-SHA1"
			}
		};

		var accessor = {
		  consumerSecret: yelpKey.consumerSecret,
		  tokenSecret: yelpKey.accessTokenSecret
		};

		

		var setYelpAttr = function( name, value ){
			if( isValid( name ) ){
				yelp[name] = value;
			}
		};

		var isValid = function( name ){
			return ( yelp[name] !== undefined );
		};

		var yelpApiCall = function( searchType, params ){
			var pYelp = $q.defer(),
				parameters = [];
				
				for( var terms in params ){
					parameters.push([terms, params[terms]]);
				}
				parameters.push(['location', "Orange+Country"]);
				parameters.push(['callback', 'cb']);
				parameters.push(['oauth_consumer_key', yelpKey.consumerKey]);
				parameters.push(['oauth_consumer_secret', yelpKey.consumerSecret]);
				parameters.push(['oauth_token', yelpKey.accessToken]);
				parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

			var message = { 
			  'action': 'http://api.yelp.com/v2/' + searchType,
			  'method': 'GET',
			  'parameters': parameters 
			};

			var success = function(data){
				//pYelp.resolve(data);
				$rootScope.$broadcast('yelpResults', data);
			};

			var failure = function(data){
				console.log('failure', data);
			}

			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);

			var parameterMap = OAuth.getParameterMap(message.parameters);
			parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

			$.ajax({
			  'url': message.action,
			  'data': parameterMap,
			  'cache': true,
			  'dataType': 'jsonp',
			  'jsonpCallback': 'cb',
			  'success': success,
			  'error': failure
			});

			//return pYelp.promise;
		};

		var yelpBusinessApiCall = function( params ){
			var pYelp = $q.defer()
				parameters = [];
				
				parameters.push(['location', "Orange+Country"]);
				parameters.push(['callback', 'cb']);
				parameters.push(['oauth_consumer_key', yelpKey.consumerKey]);
				parameters.push(['oauth_consumer_secret', yelpKey.consumerSecret]);
				parameters.push(['oauth_token', yelpKey.accessToken]);
				parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

			var message = { 
			  'action': 'http://api.yelp.com/v2/business/' + params,
			  'method': 'GET',
			  'parameters': parameters 
			};

			var success = function(data){
				//pYelp.resolve(data);
				$rootScope.$broadcast('yelpBusinessResults', data);
			};

			var failure = function(data){
				console.log('failure', data);
			}

			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);

			var parameterMap = OAuth.getParameterMap(message.parameters);
			parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

			$.ajax({
			  'url': message.action,
			  'data': parameterMap,
			  'cache': true,
			  'dataType': 'jsonp',
			  'jsonpCallback': 'cb',
			  'success': success,
			  'error': failure
			});

			//return pYelp.promise;
		};

		return{
			setAttr:function(name,value){
				setYelpAttr( name, value );
			},
			makeSearchCall: function( params ){
				return yelpApiCall( 'search', params );
			},
			makeBusinessCall: function( params ){
				return yelpBusinessApiCall( params );
			}
		};

	}]);