'use strict';

/* Services */


myApp.factory('', function() {
	return {
			
		getCartoDBdata: function(cartoquery) { //said that because asynch, need to add this successcb
			var deferred = $q.defer(); // a promise
			
			$http({
				method: 'GET',
				url: cartoquery

			}) //end $http
			.success(function(data, status, headers, config) {
				deferred.resolve(data)
				//console.log(data.rows)
				//$log.info(data, status, headers(), config)
				// angular.forEach(data.rows, function(value, index) {
				// 	$scope.alldata.push(value)
				// 	console.log($scope.alldata)

			}) //end success
			.error(function(data, status, headers, config) {
				
				deferred.reject(status);
				$log.warn(data, status, headers, config);

			});

			return deferred.promise;
		} //end getdata function

	}//end return
});





