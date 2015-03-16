(function(angular, _){
	'use strict';

	angular.module('app').filter('search', searchFilter);
	searchFilter.$inject = ['$timeout'];

	function searchFilter($timeout){
		return memoize(filter, getCacheKey);

		function filter(arr, fields, value){
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
		}

		function getCacheKey(arr, fields, value){
			return arr.length + '|' + fields + '|' + value;
		}

		function memoize(func, resolver){
			var memo = {};
		    resolver || (resolver = _.identity);
		    return function() {
				var key = resolver.apply(this, arguments);

				// after digest, clear the cache
				$timeout(function() {
					delete memo[key];
				}, 0, false);

				return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
		    };
		}
	}

})(window.angular, window._);