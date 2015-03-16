(function(angular){
	
	angular.module('app').controller('mainController', mainController);
	angular.$inject = ['$scope', 'searchFilter', 'contactsService'];

	function mainController($scope, searchFilter, contactsService){
		var vm = this;

		// props
		vm.contacts = [];
		vm.filteredContacts = [];
		vm.nameFilter = null;
		vm.pages = [];
		vm.pgIndex = 1;
		vm.pgSize = 50;
		vm.selectedContact = null;
		vm.stateFilter = null;

		// methods
		vm.next = next;
		vm.page = page;
		vm.prev = prev;
		vm.select = select;
		vm.setPgSize = setPgSize;

		// watch me
		$scope.$watch(function(){
			return vm.nameFilter;
		}, function(){
			update();
		});

		$scope.$watch(function(){
			return vm.stateFilter;
		}, function(){
			update();
		});

		/**
		 * Pages to the next index
		 */
		function next(){
			if(vm.pgIndex == vm.pages.length)
				return;
			vm.pgIndex--;
			update();
		}

		/**
		 * Pages to the given page
		 * @param int index The index to page to
		 */
		function page(index){
			vm.pgIndex = index;
			update();
		}

		/**
		 * Pages to the prev index
		 */
		function prev(){
			if(vm.pgIndex == 1)
				return;
			vm.pgIndex--;
			update();
		}

		/**
		 * Selects the contact
		 * @param contact The contact
		 */
		function select(contact){
			vm.selectedContact = contact;
		}

		/**
		 * Set the page size
		 */
		function setPgSize(ct){
			vm.pgSize = ct;
			vm.pgIndex = 1;	
			update();
		}

		/**
		 * Updates the filtered contacts list
		 */
		function update(){
			if(!vm.contacts)
				return;

			var results = vm.contacts;
			
			// filter
			results = searchFilter(results, 'state', vm.stateFilter);
			results = searchFilter(results, 'first_name, last_name', vm.nameFilter);

			// page
			var skip = (vm.pgIndex - 1) * vm.pgSize;
			var end = skip + vm.pgSize;
			var pgCount = Math.ceil(results.length / vm.pgSize);
			
			results = results.slice(skip, end);
			
			vm.pages = new Array(pgCount);
			vm.filteredContacts = results;
		}

		// load it up
		(function init(){
			contactsService
				.getContacts(vm.pgIndex, vm.pgSize)
				.then(function(result){
					vm.contacts = result;
					update();
				});
		})();
	}

})(window.angular);