dodah.factory( 'yelpAIP', [ '$http', function( $http ) {

	var yelp = {
		apiKey: 'Q3q81GK2NWnvuRDZMHRYZg',
		Token: 'UXb5hozA4KDJf5ts1kymggIVD0XquOa-'
	};

	var setYelpAttr = function( name, value ){
		if( isValid( name ) ){
			yelp[name] = value;
		}
	};

	var isValid = function( name ){
		return ( yelp[name] !== undefined );
	};

	var yelpApiCall = function( params ){

	};

	return{
		setAttr:function(name,value){
			setYelpAttr( name, value );
		},
		makeCall: function( params ){
			return yelpApiCall( params );
		}
	};

}]);