'use strict';

/* Services */


myApp.factory('footballranks', ['$http',
    function($http) {
    	return {
    		get: function(callback){
        $http.get("data/football.json").success(function(data, status) {
            var tempFootballJson = {};

            for (var i = 0; i < data.length; i++) {
                var country = data[i];
                tempFootballJson[country['alpha-3']] = country;
            }

            //then set on scope
            $scope.footballObject = tempFootballJson;
            $scope.football = data;

        });
    }
    }

    }
]);

// myAppServices.service('footballranksSrvc',['$q','footballranks',
//                                   function($q, footballranks){
//                          footballranks.Query(function(resource){
//                          	console.log(resource)
//                          })
//                                   	}]);
