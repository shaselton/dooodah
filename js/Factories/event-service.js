;(function(){
	dodah.factory( 'eventService', [function(){
		var event = {},
			events = [];

		var setEvent = function( obj ){
			event = obj;
		};

		var getEvent = function(){
			return event;
		};

		var parsedEvents = function(){
			var parsedList = [];
			for( var i = 0, len = events.length; i < len; i++ ){
				if( !angular.equals(event, events[i]) ){
					parsedList.push( events[i] );
				}
			}
			return parsedList;
		}

		var setEvents = function( objs ){
			events = objs;
		}

		return{
			setEvent: function( obj ){
				setEvent( obj );
			},
			setEvents: function( objs ){
				setEvents( objs );
			},
			getEvent: function(){
				return getEvent();
			},
			getOtherEvents: function(){
				return parsedEvents();
			}
		};
	}]);
})();