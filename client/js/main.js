angular.module('pointMotion',[])

.config(function (){
	
})

.controller('mainController',function($scope, cars, getCars){
	$scope.cars = [
		{name:'test', whatever:'klfdjlsa'},
		{name:'test1', whatever:'klfdjlsa'},
		{name:'test2', whatever:'klfdjlsa'},
		{name:'test3', whatever:'klfdjlsa'},
		{name:'test4', whatever:'klfdjlsa'},
		{name:'test4', whatever:'klfdjlsa'},
		{name:'test4', whatever:'klfdjlsa'},
		{name:'test4', whatever:'klfdjlsa'},
		];

	getCars(null, function(data){
		//cars = data;
		
	})

	$scope.selectCar = function(selectedCar){
		selectedCar.selected = true;
		//getCars(selectedCar, function(data){
		//	cars = data;
		//})
	}

	var my_controller = new Leap.Controller({enableGestures: true});
  	
  	my_controller.on('frame', function(frame_instance){ 
  	
  	frame_instance.gestures.forEach(function(g){
  		if(g.type == "swipe")
  		{
  			var x = (g.position[0] + 200) / 400;
  			var y = (g.position[1] ) / 400;

  			x = Math.max(x,0);
  			x = Math.min(x,1);
  			x = x * (($scope.cars.length / 2) - 1);
  			x = Math.round(x);

			y = Math.max(y,0);
  			y = Math.min(y,1);
  			y = Math.round(y);

  			y = !y;

  			console.log("x: " + x);
  			console.log("y: " + y);

  			$scope.cars.forEach(function(el){
  				el.selected = false;
  			});
  			
  			$scope.cars[x + (y * 4)].selected = true;
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
		scope: {cars:'='}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'templates/pointMotionCarList.html',
		// replace: true,
		transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller, cars) {
			$scope.$watch('cars', function(cars) {
				console.log("watch");
		        console.log(cars);
		     });
		}
	};
}])

.value('cars', [])


.factory('getCars', ['$http', 'cars',function($http, cars) {
  return function(car, callback){
  	$http.post('url to server', car, function(data){
  		callback(data);
  	})
  };
}])







;