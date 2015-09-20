var app = angular.module('image',[]);

app.controller('ImageCtrl', function($scope,$cordovaCamera,$cordovaGeolocation){
	
	// récupératio nde toutes les notes
	$scope.presents = [];
	var presents = localStorage.getItem('presents');
	if(presents != '' && presents != undefined){
		$scope.presents = angular.fromJson(presents);
	}
	
	$scope.getPicture = function(){
		
		$scope.loading = true;
		$scope.console = 'Get picutre';
			
		var options = {
	      quality: 50,
	      destinationType: Camera.DestinationType.FILE_URI,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: false,
	      encodingType: Camera.EncodingType.JPEG,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: true
	    };
	
	    $cordovaCamera.getPicture(options).then(function(imageData) {
		    
		    // récupération de la localisation
			$cordovaGeolocation
				.getCurrentPosition()
				.then(function (position) {
					
					$scope.console = 'Geolocalisation OK';
					
					var lat = position.coords.latitude;
					var lng = position.coords.longitude;
					
					// récupération de la ville
					var geocoder = new google.maps.Geocoder();
					var latlng = new google.maps.LatLng(lat, lng);
					geocoder.geocode( { 'location': latlng}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						
							$scope.console = 'Get city OK';
							
							var city = results[0]['address_components'][2]['long_name'];
							
							// ajout de l'image dans le tableau des presents
							$scope.presents.push({
								id 		: $scope.presents.length + 1,
								type	: 'image',
								content	: imageData,
								date	: (new Date).getTime(),
								lat 	: lat,
								lng 	: lng,
								city	: city
							});
							
							// enregistre le tableau
							localStorage.setItem('presents',angular.toJson($scope.presents));
	
							$scope.console = 'Insert OK';
													
						}
						
						else{ 
							$scope.loading = false;
							alert('Récupération de votre ville impossible');
						}
					});
				
				}, function(err) {
					$scope.loading = false;
					alert('Récupération de votre position impossible');
				});
		
			
			
			// enregistre le tableau
			localStorage.setItem('presents',angular.toJson($scope.presents));
		
	    }, function(err) {
	      // error
	    });
	
	}
	
});