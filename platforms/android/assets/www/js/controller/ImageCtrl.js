var app = angular.module('image',[]);

app.controller('ImageCtrl', function($scope,$cordovaCamer){
	
	$scope.getPicture = function(){
		
		var options = {
	      quality: 50,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 100,
	      targetHeight: 100,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false
	    };
	
	    $cordovaCamera.getPicture(options).then(function(imageData) {
	      var image = document.getElementById('myImage');
	      image.src = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	      // error
	    });
	
	}
	
});