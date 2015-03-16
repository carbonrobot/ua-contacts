describe("Search Filter Tests", function() {

	var filter,
		scope;

	var contacts = [
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
	        "last_name": "Weeksac",
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

	beforeEach(function(){
		module('app');
		inject(function(searchFilter){
			filter = searchFilter;
		});
	});

	it("Should not be null", function(){
		expect(filter).not.toBe(null);
	});

	it("Should return filtered results", function(){
		var input = contacts;
		expect(filter(contacts, 'state', 'CA').length).toBe(2);
	});

	it("Should return partial matches", function(){
		var input = contacts;
		expect(filter(contacts, 'first_name', 'ac').length).toBe(2);
	});

	it("Should return partial matches on multiple fields", function(){
		var input = contacts;
		expect(filter(contacts, 'first_name, last_name', 'ac').length).toBe(3);
	});

});