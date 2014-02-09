var urlToAccess = "http://localhost:1337";
angular.module('pointMotion',[])

.config(function (){
	
})

.controller('mainController',function($scope, cars, getCars, $http){

	$http.get(urlToAccess,{headers:{'Content-Type': 'application/json'}}).success(function(data){
		console.log(data);
		$scope.cars = data;
	});
	$scope.loading = false;

	$scope.selectCar = function(selectedCar){
		//selectedCar.selected = true;
		$scope.loading = true;
		getCars(selectedCar, function(data){
			$scope.cars = data;
			$scope.loading = false;
		});
		$scope.cars.forEach(function(el){
  				el.highlighted = false;
  			});
	}

	var my_controller = new Leap.Controller({enableGestures: true});
  	var petaIsAPedo = false;
  	var clicked = false;
  	my_controller.on('frame', function(frame_instance){ 

  	frame_instance.gestures.forEach(function(g){
		if(!petaIsAPedo)
  		{
	  		$('html, body').animate({
	        	scrollTop: $('[name="menu"]').offset().top
	    	}, 500);
	    	petaIsAPedo = false;
  		}
  		if(g.type == "swipe")
  		{
  			var x = (g.position[0] + 200) / 400;
  			var y = (g.position[1] ) / 400;
  			var z = g.position[2];

  			x = Math.max(x,0);
  			x = Math.min(x,1);
  			x = x * (($scope.cars.length / 2) - 1);
  			x = Math.round(x);

			y = Math.max(y,0);
  			y = Math.min(y,1);
  			y = Math.round(y);
  			y = !y;



  			//console.log("x: " + x);
  			//console.log("y: " + y);
  			//console.log("z: " + z);
  			
  			if(!clicked & z < -100)
  			{
  				clicked = true;
  				$scope.loading = true;
  				getCars($scope.cars[x + (y * 4)], function(data){
  					$scope.cars = data;
  					clicked = false;
  					$scope.loading = false;
  					console.log(data);
  				});
  			}

  			$scope.cars.forEach(function(el){
  				el.highlighted = false;
  			});
  			
  			$scope.cars[x + (y * 4)].highlighted = true;
  			$scope.$apply();
  		}
  		
  	});

  });
  my_controller.connect();


})

.directive('pointMotionCarList', [function($scope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {cars:'=', select:'='}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'templates/pointMotionCarList.html',
		// replace: true,
		transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller, cars) {
			//$scope.selectFunction = $scope.select();
		}
	};
}])

.value('cars', [])


.factory('getCars', ['$http', 'cars',function($http, cars) {
  return function(car, callback){
  	console.log('loading...');
  	$http.post(urlToAccess, car,{headers:{'Content-Type': 'application/json'}}).success(function(data){
  		callback(data);
  	});
  };
}])







;