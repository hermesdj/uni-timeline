angular.module("timelineExample", ['uniTimeline', 'mgcrea.ngStrap'])
	.controller('ExampleController', function($scope, $uniTimeline){
		$scope.submit = function(event){
			console.log(event);
			$uniTimeline.events.add(event);
		};
	});