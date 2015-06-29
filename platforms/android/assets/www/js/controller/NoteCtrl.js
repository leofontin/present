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
		
		// récupération de la localisation
		$cordovaGeolocation
			.getCurrentPosition()
			.then(function (position) {
				
				console.log(position);
				
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				// récupération de la ville
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(lat, lng);
				geocoder.geocode( { 'location': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
						var city = results[0]['address_components'][2]['long_name'];
						
						// ajout de la note dans le tableau des notes
						$scope.presents.push({
							id 		: $scope.presents.length + 1,
							type	: 'note',
							content	: $scope.noteText,
							date	: (new Date).getTime(),
							lat 	: lat,
							lng 	: lng,
							city	: city
						});
						
						// enregistre le tableau
						localStorage.setItem('presents',angular.toJson($scope.presents));
						
					}
				});
			
			$scope.loading = false;
			$scope.success = true;
			
			}, function(err) {});
	};
		
	// Initialsiation des variables
	$scope.loading = false;
	$scope.success = false;
	
	
});