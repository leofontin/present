var app = angular.module('front',[]);

app.controller('FrontCtrl', function($scope,$location){
	
	
	// récupératio nde toutes les notes
	$scope.presents = [];
	var presents = localStorage.getItem('presents');
	if(presents != '' && presents != undefined){
		$scope.presents = angular.fromJson(presents);
	}
	
	

	// affichage des google map
	$(window).load(function(){
		for(var i=0; i<$scope.presents.length; i++){			
			
			var latlng = new google.maps.LatLng($scope.presents[i]['lat'],$scope.presents[i]['lng']);
			
			var mapOptions = {
	          center: latlng,
	          zoom: 8
	        };
	        
	        var id = 'Front-map'+$scope.presents[i]['id'];
	        var map = new google.maps.Map(document.getElementById(id),mapOptions);
	        
	        var marker = new google.maps.Marker({
		      position: latlng,
		      map: map
		  });
	
		}
	});
	
	
	
	
	// convertion de la date
	$scope.convertdate = function(date){
		var date = new Date(date);

		var month = date.getMonth() + 1;
		month = (month < 10) ? '0'+month : month;
		
		date =  date.getDate() +'/'+ month;	
		return date;
	}
	
	
});