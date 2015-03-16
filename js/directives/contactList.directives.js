(function(angular){
	'use strict';

	angular.module('app').directive('contactList', contactList);

	/**
	 * Contact list directive
	 */
	function contactList(){
		return {
			restrict: 'AE',
			replace: true,
			scope: {
				contacts: '=contactList'
			},
			templateUrl: 'js/views/contactList.views.html',
			controller: 'contactListController as clvm'
		};
	}

	angular.module('app').controller('contactListController', contactListController);
	contactListController.$inject = ['$scope'];

	/**
	 * Contact list directive controller
	 */
	function contactListController($scope){
		var vm = this;
		
		// props
		vm.pages = [];
		vm.pagedContacts = [];
		vm.pgIndex = 1;
		vm.pgSize = 50;
		vm.selectedContact = null;

		// methods
		vm.next = next;
		vm.page = page;
		vm.prev = prev;
		vm.select = select;
		vm.setPgSize = setPgSize;

		// watch me
		$scope.$watch('contacts', paginate);

		/**
		 * Pages to the next index
		 */
		function next(){
			vm.page(vm.pgIndex+1);
		}

		/**
		 * Pages to the given page
		 * @param int index The index to page to
		 */
		function page(index){
			if(index > vm.pages.length)
				return;
			if(index < 1)
				return;

			vm.pgIndex = index;
			paginate();
		}

		/**
		 * Pages to the prev index
		 */
		function prev(){
			vm.page(vm.pgIndex-1);
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
			paginate();
		}
		
		/**
		 * Updates the filtered contacts list
		 */
		function paginate(){
			if(!$scope.contacts){
				vm.pagedContacts = [];
				return;
			}

			var results = $scope.contacts;
			var skip = (vm.pgIndex - 1) * vm.pgSize;
			var end = skip + vm.pgSize;

			var pgCount = Math.ceil(results.length / vm.pgSize);
			vm.pages = new Array(pgCount);

			results = results.slice(skip, end);
			vm.pagedContacts = results;
		}

	}

})(window.angular);