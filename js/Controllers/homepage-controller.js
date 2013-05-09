dodah.controller('homeController',['$scope',function($scope){
	$scope.categories = {};
	$scope.events = [];
	$scope.categories.header = [];

	$scope.categories.header.push({imgSrc:'img/category.png', title:'Food'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Art Lover'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Concerts'});
	$scope.categories.header.push({imgSrc:'img/category.png', title:'Sports Fan'});

	$scope.events.push({date:'date',title:'title',location:'location',blurb:'blurb'});

}]);