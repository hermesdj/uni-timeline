/*! uni-timeline - v0.1.0 - 2014-02-04
 * https://github.com/hermesdj/angular-timeline
 * Copyright (c) Jeremy Dallard <dallardj@gmail.com> 2014 Licensed  
 */
angular.module('uniTimeline', [])
	.provider('$uniTimeline', function(){
		var events = [];
		var eras = [];
		this.$get = function(){
			return {
				addEvent: function(event){
					events.push(event);
				},
				removeEvent: function(event){
					if(this.indexOf(event) != -1) {
				        return events.splice(this.indexOf(event), 1);
				    }   
				},
				addEra: function(era){
					eras.push(era);
				},
				removeEra: function(era){
					if(this.indexOf(era) != -1) {
				        return eras.splice(this.indexOf(era), 1);
				    }
					return false;
				},
				dateToPixel: function(date){
					
				},
				pixelToDate: function(pixel){
					
				}
			};
		};
	})
	.directive('uniTimeline', ['$window', '$document', '$uniTimeline', function($window, $document, $uniTimeline) {
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
					$scope.events = [];
					
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

		}]);
