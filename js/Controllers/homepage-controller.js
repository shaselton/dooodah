dodah.controller('homeController',['$scope',function($scope){
	$scope.categories = {};
	$scope.events = [];
	$scope.categories.header = [];

	$scope.categories.header.push({imgSrc:'img/category.png', title:'Food'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Art Lover'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Concerts'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Sports Fan'});

	$scope.events.push({
			date:{
				day:'fri', 
				dateFormat: '6/14', 
				time: '1 pm'
			},
			title:{
				eventName:'Gallery Talk: Scrimshaw',
				place:'Bowers Museum',
				cityState:'Santa Ana, Ca'
			},
			imgSrc:'img/category.png',
			blurb:'Please join an expert docent for a 20-minute tour of this exhibit. Expand your knowledge, learn the history, ask plenty of questions about the'
		},
		{
			date:{
				day:'fri', 
				dateFormat: '6/14', 
				time: '1 pm'
			},
			title:{
				eventName:'Gallery Talk: Scrimshaw',
				place:'Bowers Museum',
				cityState:'Santa Ana, Ca'
			},
			imgSrc:'img/category.png',
			blurb:'Please join an expert docent for a 20-minute tour of this exhibit. Expand your knowledge, learn the history, ask plenty of questions about the'
		},
		{
			date:{
				day:'fri', 
				dateFormat: '6/14', 
				time: '1 pm'
			},
			title:{
				eventName:'Gallery Talk: Scrimshaw',
				place:'Bowers Museum',
				cityState:'Santa Ana, Ca'
			},
			imgSrc:'img/category.png',
			blurb:'Please join an expert docent for a 20-minute tour of this exhibit. Expand your knowledge, learn the history, ask plenty of questions about the'
		});

}]);