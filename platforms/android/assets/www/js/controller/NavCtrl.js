var app = angular.module('nav',[]);


app.config(function($routeProvider){
	$routeProvider
	
		// page d'accueil
		.when('/', {
			controller  : 'FrontCtrl',
			templateUrl : 'page/front.html'
		})
		
		// ajout d'une note
		.when('/note-add', {
			controller  : 'NoteCtrl',
			templateUrl : 'page/note.html'
		})
		
		// ajout d'une image
		.when('/image-add', {
			controller  : 'ImageCtrl',
			templateUrl : 'page/image.html'
		})
		
		// redirection automatique
		.otherwise({
	      redirectTo : '/'
	    });
});



app.controller('NavCtrl', function($scope){
	
/*
	$scope.loading = false;
	
	$scope.navShow = false;
	$scope.navOpen = 'close';
	
	$scope.show = function(){
		
		if($scope.navShow == false){
			$scope.navShow = true;
			$scope.navOpen = 'open';
		}else{
			$scope.navShow = false;
			$scope.navOpen = 'close';
		}
	}
	
	
	$scope.$on('$routeChangeStart', function() {
		$scope.loading = true;
	});
	
	$scope.$on('$routeChangeSuccess', function() {
		$scope.loading = false;
		ui.init();
	});
*/
    
});