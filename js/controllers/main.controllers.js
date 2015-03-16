(function(angular){
	'use strict';

	angular.module('app').controller('mainController', mainController);
	angular.$inject = ['$scope', 'contactsService'];

	function mainController($scope, contactsService){
		var vm = this;

		// props
		vm.contacts = [];
		vm.nameFilter = null;
		vm.stateFilter = null;

		// load it up
		(function init(){
			contactsService
				.getContacts(vm.pgIndex, vm.pgSize)
				.then(function(result){
					vm.contacts = result;
				});
		})();
	}

})(window.angular);