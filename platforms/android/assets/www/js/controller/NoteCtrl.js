var app = angular.module('note',[]);

app.controller('NoteCtrl', function($scope,$cordovaGeolocation,$http){
	
	// récupératio nde toutes les notes
	$scope.presents = [];
	var presents = localStorage.getItem('presents');
	if(presents != '' && presents != undefined){
		$scope.presents = angular.fromJson(presents);
	}
	
	
	/*
	* ADD
	* ajout d'une nouvelle note
	*/
	
	$scope.add = function(){
		
		$scope.loading = true;
		
		console.log('send');
		
		// récupération de la localisation
		$cordovaGeolocation
			.getCurrentPosition()
			.then(function (position) {
				
				$scope.loading = false;
				$scope.success = true;
				
				console.log('geocode ok');
				
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				// récupération de la ville
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(lat, lng);
				geocoder.geocode( { 'location': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					
						console.log('location ok');
						
						var city = results[0]['address_components'][2]['long_name'];
						
						// calcul de l'id
						var id = $scope.presents.length + 1;
						
						// ajout de la note dans le tableau des notes						
						$scope.presents.push({
							id 		: id,
							type	: 'note',
							content	: $scope.noteText,
							date	: (new Date).getTime(),
							lat 	: lat,
							lng 	: lng,
							city	: city
						});
						
						// enregistre le tableau
						localStorage.setItem('presents',angular.toJson($scope.presents));
						$scope.noteText = '';
						console.log('insert ok');
						
						
						
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
	};
		
	// Initialsiation des variables
	$scope.loading = false;
	$scope.success = false;
	
	
});