'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/

myApp.controller('DemoController', ["$scope", "$http",'$q',
    function($scope, $http, $q) {

    	 $scope.orderByField = 'fifarank';
  		$scope.reverseSort = false;
        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            //countryMouseover(leafletEvent);
        });

        $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
            countryClick(featureSelected, leafletEvent);
        });


        angular.extend($scope, {
            center: {
                lat: 40.8471,
                lng: 14.0625,
                zoom: 2
            },
            legend: {
                colors: ['#CC0066', '#006699', '#FF0000', '#00CC00', '#FFCC00'],
                labels: ['Oceania', 'America', 'Europe', 'Africa', 'Asia']
            }
        });

        function countryClick(country, event) {
            console.log(country.properties.name);
        }


        function getColorFootball(d) {
  
        	if (d){

        		d=d['fifarank']
        	}
            return d > 35 ? ['#800026',1] :
                   d > 30  ? ['#BD0026',1] :
                   d > 25  ? ['#E31A1C',1] :
                   d > 20  ? ['#FC4E2A',1] :
                   d > 15   ? ['#FD8D3C',1] :
                   d > 10   ? ['#FEB24C',1] :
                   d > 5   ? ['#FED976',1] :
                              ['grey',0];
        }




        function style(feature) {
  			var vals = getColorFootball($scope.football[feature.properties.ISO3])
            return {
                fillColor: vals[0],
                radius: 8,
                  color: "#000",
                  weight: 1,
                  opacity: vals[1],
                  fillOpacity: vals[1]
            };
        }

        $http.get("data/football.json").then(function(result) {
                var data=result.data
                var football = {};
                for (var i = 0; i < data.length; i++) {
                    var country = data[i];
                    football[country['alpha-3']] = country;

                }
                return $scope.football = football
        });



            // http://thematicmapping.org/downloads/world_borders.php
            // qgis to do centroids, move US, save as geojson
            $http.get("data/countriespt2.geojson").success(function(data, status) {
                angular.extend($scope, {
                    geojson: {
                        data: data,
                        style: style
                        // resetStyleOnMouseout: true
                    }
                });
            });
// myAppServices.factory('getLocalTopoJSONSrvc', function($q, $http) {
//   return {

//     getLocalTopoJSON: function() {

//       //return $http.get("data/townshipQ5000_id_1e-8.json")      
//       return $http.get("data/county.topojson").then(function(response) {
//         if (typeof response.data === 'object') {

//           var geoJsonObject = topojson.feature(response.data, response.data.objects.county)

//           return geoJsonObject;
//         } else {
//             // invalid response
//             return $q.reject(response.data);
//         }

//       }, function(response) {
//         // something went wrong
//         return $q.reject(response.data);
//       }); 
        
//       // map.data.addGeoJson(geoJsonObject);               

//     }// end getGeoJSON function


//   };
// });



    }
]);
