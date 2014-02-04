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


angular.module('uniTimeline', [])
	.provider('$uniTimeline', function(){
		this.$get = function(){
			var events = [], eras = [];
			
			/**
			 * Manage events content
			 */
			var eventManager = {
				get: function(index){
					if(index){
						if(events.indexOf(event) != -1) {
					        return events[index];
					    }else{
					    	return null;
					    }
					}else{
						return events;
					}
				},
				add: function(event){
					events.push(angular.copy(event));
				},
				remove: function(event){
					if(events.indexOf(event) != -1) {
				        return events.splice(this.indexOf(event), 1);
				    }  
					return false;
				},
				update: function(event){
					if(events.indexOf(event) != -1) {
				        return events[events.indexOf(event)] = event;
				    }
					return false;
				}
			};
			
			/**
			 * Manage era content
			 */
			var eraManager = {
					get: function(index){
						if(index){
							if(eras.indexOf(event) != -1) {
						        return eras[index];
						    }else{
						    	return null;
						    }
						}else{
							return eras;
						}
					},
					add: function(era){
						eras.push(angular.copy(era));
					},
					remove: function(era){
						if(era){
							if(eras.indexOf(era) != -1) {
						        return eras.splice(this.indexOf(era), 1);
						    }
						}else{
							eras = [];
						}
					},
					update: function(era){
						if(eras.indexOf(era) != -1) {
					        return eras[eras.indexOf(event)] = era;
					    }
						return false;
					}	
			};
			
			var tools = {
				dateToPixel: function(date){
					
				},
				pixelToDate: function(pixel){
					
				}	
			};
			return {
				events: eventManager,
				eras: eraManager,
				tools: tools
			};
		};
	})
	.directive('uniTimeline', ['$window', '$document', '$uniTimeline', function($window, $document, $uniTimeline) {	
		return {
				restrict : 'EA',
				templateUrl : 'templates/timeline.html',
				scope: {
					start: '=',
					end: '=',
					current: '='
				},
				link: function($scope, $element){
					$scope.dates = {};
					
					$scope.dates.major = [];
					for(i = $scope.start; i <= $scope.end; i+=100){
						$scope.dates.major.push(i);
					}
					$scope.dates.minor = [];
					for(i = $scope.start; i <= $scope.end; i+=10){
						$scope.dates.minor.push(i);
					}
					
					$scope.events = $uniTimeline.events.get();
					
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
