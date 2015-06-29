var app = angular.module('map',['ngCordova']);

app.controller('MapCtrl', function($scope,$cordovaGeolocation){
	
	
	/*
	* INTIALISATION
	*/
	
	// options de la carte
	var mapOptions = {
        zoom	: 13,
        center	: new google.maps.LatLng(40.0000, -98.0000)
    }

	// affichage de la carte
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    
    // geolocalisation
    
	$cordovaGeolocation
	.getCurrentPosition()
	.then(function (position) {
		
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    
	    var marker = new google.maps.Marker({
            map			: $scope.map,
            position	: latlng
        });
        
        $scope.map.setCenter(marker.getPosition());
		
	}, function(err) {
		// error
	});

    
	
});