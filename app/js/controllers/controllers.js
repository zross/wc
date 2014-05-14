'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/

myApp.controller('DemoController', ["$scope", "$http",
    function($scope, $http) {

        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            countryMouseover(leafletEvent);
        });

        $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
            countryClick(featureSelected, leafletEvent);
        });

        var continentProperties = {
            "009": {
                name: 'Oceania',
                colors: ['#CC0066', '#993366', '#990066', '#CC3399', '#CC6699']
            },
            "019": {
                name: 'America',
                colors: ['#006699', '#336666', '#003366', '#3399CC', '#6699CC']
            },
            "150": {
                name: 'Europe',
                colors: ['#FF0000', '#CC3333', '#990000', '#FF3333', '#FF6666']
            },
            "002": {
                name: 'Africa',
                colors: ['#00CC00', '#339933', '#009900', '#33FF33', '#66FF66']
            },
            "142": {
                name: 'Asia',
                colors: ['#FFCC00', '#CC9933', '#999900', '#FFCC33', '#FFCC66']
            },
        };

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

        // Get a country paint color from the continents array of colors

        function getColor(country) {
            if (!country || !country["region-code"]) {
                return "#FFF";
            }

            var colors = continentProperties[country["region-code"]].colors;
            var index = country["alpha-3"].charCodeAt(0) % colors.length;
            return colors[index];
        }




        function getColorFootball(d) {
            return d > 35 ? '#800026' :
                   d > 30  ? '#BD0026' :
                   d > 25  ? '#E31A1C' :
                   d > 20  ? '#FC4E2A' :
                   d > 15   ? '#FD8D3C' :
                   d > 10   ? '#FEB24C' :
                   d > 5   ? '#FED976' :
                              '#FFEDA0';
        }

        function style(feature) {
            return {
                fillColor: getColor($scope.countries[feature.id]),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        // Mouse over function, called from the Leaflet Map Events

        function countryMouseover(leafletEvent) {
            var layer = leafletEvent.target;
            layer.setStyle({
                weight: 2,
                color: '#666',
                fillColor: 'white'
            });
            layer.bringToFront();
        }

        // Get the countries data from a JSON
        $http.get("data/all.json").success(function(data, status) {

            // Put the countries on an associative array
            $scope.countries = {};
            for (var i = 0; i < data.length; i++) {
                var country = data[i];
                $scope.countries[country['alpha-3']] = country;
            }

            // Get the countries geojson data from a JSON
            $http.get("data/countries.geojson").success(function(data, status) {
                angular.extend($scope, {
                    geojson: {
                        data: data,
                        style: style,
                        resetStyleOnMouseout: true
                    }
                });
            });


            $http.get("data/football.json").success(function(data, status) {
                $scope.football = {};
                for (var i = 0; i < data.length; i++) {
                    var country = data[i];
                    $scope.football[country['country']] = country;
                    console.log($scope.football)
                }

            });


        });



    }
]);
