describe("Timeline: Testing the module", function(){
	describe("Timeline Module:", function(){
		var module;
		beforeEach(function(){
			module = angular.module("uniTimeline");
		});
		
		it("should be registered", function(){
			expect(module).not.toBe(null);
		});
	});
});

describe("Timeline Directive: ", function() {
	var scope, $compile, $templateCache, sandboxEl;
	
	beforeEach(module('uniTimeline'));
	
	beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_){
		scope = _$rootScope_.$new();
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'));
		$compile = _$compile_;
		$templateCache = _$templateCache_;
	}));
	
	afterEach(function(){
		scope.$destroy();
		sandboxEl.remove();
	});
	
	function compileDirective(tpl){
		if(!tpl) tpl = '<uni-timeline class="uni-time" start="1600" end="2000" current="1750"></uni-timeline>';
		var element = $(tpl).appendTo(sandboxEl);
		element = $compile(element)(scope);
		scope.$digest();
		return jQuery(element[0]);
	}
	
	describe("initialisation", function(){
		it("The template should have been compiled", function(){
			var elm = compileDirective();
			expect(elm.children('div').hasClass('uni-time-container'));
		});
		
	});
});