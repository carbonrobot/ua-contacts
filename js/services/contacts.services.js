(function(angular){
	
	angular.module('app').factory('contactsService', contactsService);
	angular.$inject = ['$http'];

	function contactsService($http){
		return {
			getContacts: getContacts
		};	

		function getContacts(){
			return $http
				.get('./js/services/sample-data.json')
				.then(function(response){
					return response.data;
				});
		}
	}

})(window.angular);