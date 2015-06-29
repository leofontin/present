var app = angular.module('image',[]);

app.controller('ImageCtrl', function($scope,CameraService){
	
	localStorage.removeItem('images');
	
	// récupération des images sauvegardées
	$scope.imgs = [];
	var imgs = localStorage.getItem('images');
	if(imgs != '' && imgs != undefined){
		$scope.imgs = angular.fromJson(imgs);
	}
	
	
	
	/*
	* SET ALERT
	* gère l'affichage de l'alert
	*/
	$scope.setAlert = function(){
		$scope.alert = true;
		if($scope.imgs.length > 0){
			$scope.alert = false;
		}
	}
	

	
	/*
	* SNAP
	* Prendre une nouvelle photo
	*/
	
	$scope.snap = function(){
		
		var options = {
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType 		: Camera.PictureSourceType.PHOTOLIBRARY
		};

		CameraService.getPicture(options).then(function(url){
			
			$scope.imgs.push({
				id	: (new Date()).getTime(),
				url : url
			});
			
			// enregistrement
			localStorage.setItem('images',angular.toJson($scope.imgs));
			
		}, function(err){
			console.log(err);
		});
		
		
	}
	
	
	// Gère l'alert
	$scope.setAlert();
	
	
});