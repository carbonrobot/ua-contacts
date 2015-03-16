describe("Contact List Directive Tests", function() {

	var controller,
		scope;

	beforeEach(function(){
		module('app');
		inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			scope.contacts = [
				{
			        "address": "P.O. Box 197, 7318 Nascetur St.",
			        "city": "Fresno",
			        "email": "fermentum.convallis.ligula@Donecdignissim.ca",
			        "first_name": "Maryam",
			        "join_date": "06/20/2015",
			        "last_name": "Graham",
			        "phone": "1-872-750-1127",
			        "state": "CA",
			        "zip": "94787"
			    },
			    {
			        "address": "721-931 Et Av.",
			        "city": "Essex",
			        "email": "lacus@imperdieteratnonummy.ca",
			        "first_name": "Paloma",
			        "join_date": "04/06/2015",
			        "last_name": "Weeks",
			        "phone": "1-746-482-4391",
			        "state": "VT",
			        "zip": "11235"
			    },
			    {
			        "address": "5511 Mus. Rd.",
			        "city": "Sacramento",
			        "email": "eros@euismod.org",
			        "first_name": "Stacy",
			        "join_date": "12/21/2013",
			        "last_name": "Guerrero",
			        "phone": "1-455-159-1000",
			        "state": "CA",
			        "zip": "92304"
			    },
			    {
			        "address": "345-9646 Adipiscing, Rd.",
			        "city": "Reading",
			        "email": "lacus.Ut@vulputateullamcorpermagna.edu",
			        "first_name": "Lacey",
			        "join_date": "11/18/2014",
			        "last_name": "Collier",
			        "phone": "1-819-948-1563",
			        "state": "PA",
			        "zip": "79117"
			    }
			];

			controller = $controller('contactListController', {
				$scope: scope
			});

			scope.$apply();
		});
	});

	it("Should not be null", function(){
		expect(controller).not.toBe(null);
	});

	it("Should have a set of contacts", function(){
		expect(scope.contacts.length).toBe(4);
	});

	it("Should have paged results", function(){
		expect(controller.pagedContacts.length).toBe(4);
	});

	it("Should page contacts by pgSize", function(){
		controller.setPgSize(1);
		expect(controller.pagedContacts.length).toBe(1);
		expect(controller.pages.length).toBe(4);
	});

	it("Should navigate to a given index page", function(){
		controller.setPgSize(1);
		controller.page(2);
		expect(controller.pgIndex).toBe(2);
	});

	it("Should not navigate to a zero index page", function(){
		controller.setPgSize(1);
		controller.page(0);
		expect(controller.pgIndex).toBe(1);
	});

	it("Should not navigate backwards at index 1", function(){
		controller.setPgSize(1);
		controller.prev();
		expect(controller.pgIndex).toBe(1);
	});

	it("Should not navigate forward at max page index", function(){
		controller.setPgSize(1);
		controller.page(4)
		controller.next();
		expect(controller.pgIndex).toBe(4);
	});

	it("Should allow selection of contact", function(){
		var contact0 = controller.pagedContacts[0];
		controller.select(contact0);
		expect(controller.selectedContact).toBe(contact0);
	});

	it("Should correctly calculate the number of pages", function(){
		controller.setPgSize(1);
		expect(controller.pages.length).toBe(4);

		controller.setPgSize(3);
		expect(controller.pages.length).toBe(2);
	});

});