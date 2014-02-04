/*
 * Angular Timeline directive
 * 
 * Add a new directive to angularjs displaying a beautiful
 * timeline. The content of the timeline can be updated in 
 * any angularjs scopes
 * 
 * (c) 2014 Jeremy Dallard
 * License: MIT
 */


angular.module('uniTimeline', ['ngAnimate'])
	.directive('uniTimeline', function($window, $document) {
			return {
				restrict : 'EA',
				templateUrl : 'templates/timeline.html',
				scope: {
					start: '=start',
					end: '=end',
					current: '=current'
				},
				controller: function($scope, $element){
					$scope.dates = {};
					$scope.dates.major = [];
					
					for(i = $scope.start; i <= $scope.end; i+=100){
						$scope.dates.major.push(i);
					}
					$scope.dates.minor = [];
					for(i = $scope.start; i <= $scope.end; i+=10){
						$scope.dates.minor.push(i);
					}
					
					/**
					 * Center the indicator in the timeline
					 */
					var container = $element[0].children[0];
					$scope.getIndicatorPosition = function(){
						return container.offsetWidth / 2;
					};
					$scope.indicatorX = $scope.getIndicatorPosition;
					$scope.$watch($scope.getIndicatorPosition, function(newValue, oldValue){
						$scope.indicatorX = newValue;
					}, true);
					
					angular.element($window).bind('resize', function(){
						$scope.$apply();
					});
					
					/**
					 * Bind drag events for moving in the timeline
					 */
					var startX = 0;
					$scope.x = 0;
					angular.element(container).bind('mousedown', function(event){
						event.preventDefault();
						startX = event.pageX - $scope.x;
						$document.on('mousemove', translate);
						$document.on('mouseup', mouseup);
					});
					
					function translate(event){
						$scope.x = event.pageX - startX;
						$scope.$apply();
					}
					
					function mouseup(){
						$document.unbind('mousemove', translate);
						$document.unbind('mouseup', mouseup);
					}
				}
			};

		});
