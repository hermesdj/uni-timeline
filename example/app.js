angular.module("timelineExample", ['uniTimeline'])
	.controller('ExampleController', function($scope, $uniTimeline){
		$scope.submit = function(event){
			$uniTimeline.events.add(event);
		};
	});