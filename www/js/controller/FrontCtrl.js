var app = angular.module('front',[]);

app.controller('FrontCtrl', function($scope,$location){
	
	$scope.showImageFullScreen = false;
	
	
	// récupératio nde toutes les notes
	$scope.presents = [];
	var presents = localStorage.getItem('presents');
	if(presents != '' && presents != undefined){
		$scope.presents = angular.fromJson(presents);
		$scope.presents.reverse();
	}
	
	
	
	
	// convertion de la date
	$scope.convertdate = function(date){
		var date = new Date(date);

		var month = date.getMonth() + 1;
		month = (month < 10) ? '0'+month : month;
		
		date =  date.getDate() +'/'+ month;	
		return date;
	}
	
	
	
	
	// affichage de la carte
	$scope.showMap = function(id){
		
		// récupération des informations de la ligne concernée
		for(var i=0; i<$scope.presents.length; i++){
			if(id == $scope.presents[i]['id']){
				var data = $scope.presents[i];
			}
		}
		
		
		// créatio nde la carte	
		var latlng = new google.maps.LatLng(data['lat'],data['lng']);
			
		var mapOptions = {
          center: latlng,
          zoom: 8
        };
        
        var idMap = 'Front-map'+data['id'];
        var map = new google.maps.Map(document.getElementById(idMap),mapOptions);
        
        var marker = new google.maps.Marker({
	      position: latlng,
	      map: map
	    });
	    
	    //affichage de la carte
	    $('#'+idMap).addClass('show');
		
	}
	
	
	// affichage de l'image en plein écran
	$scope.imageShow = function(id){
		
		// récupération des informations de la ligne concernée
		for(var i=0; i<$scope.presents.length; i++){
			if(id == $scope.presents[i]['id']){
				var data = $scope.presents[i];
			}
		}
		
		$scope.showImageFullScreen = true;
		$scope.urlImageFullScreen = data['content'];
		
		$('body').addClass('imageFullScreen');
		
	}
	
	
});