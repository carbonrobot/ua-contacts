describe("Main Controller Tests", function() {

	var controller,
		contactsService,
		scope;

	beforeEach(function(){
		module('app');
		inject(function($rootScope, $controller, _contactsService_){
			scope = $rootScope.$new();
			contactsService = _contactsService_;
			controller = $controller('mainController', {
				$scope: scope,
				contactsService: contactsService
			});
		});
	});

	it("Should not be null", function(){
		expect(controller).not.toBe(null);
	});

});