(function(angular){

	angular.module('app').filter('search', searchFilter);

	function searchFilter(){
		return function(arr, fields, value){
			var result = arr;
			if(value) {
				value = value.toUpperCase();

				return arr.filter(function(e){
					var found = false;
					fields.split(',').forEach(function(f){
						var field = f.trim();
						if(e[field]) {
							if(e[field].toUpperCase().indexOf(value) > -1) {
								found = true;
							}
						}
					});
					return found;
				});
				
			}
			return result;
		};
	}

})(window.angular);