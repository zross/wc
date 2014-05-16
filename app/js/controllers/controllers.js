'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/
var blah;
myApp.controller('DemoController', ["$scope", "$http", '$q',
    function($scope, $http, $q) {

        $scope.orderByField = 'fifarank';
        $scope.reverseSort = false;
        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            countryMouseover(leafletEvent);
        });

        $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
            console.log(featureSelected)
            countryClick(featureSelected, leafletEvent);
        });

    function countryMouseover(leafletEvent) {
                var layer = leafletEvent.target;
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    fillColor: 'white'
                });
                layer.bringToFront();
            }

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

            if (d) {
                d = d['fifarank']
            }
            return d > 35 ? ['#800026', 1] :
                d > 25 ? ['#BD0026', 1] :
                d > 20 ? ['#E31A1C', 1] :
                d > 15 ? ['#FC4E2A', 1] :
                d > 10 ? ['#FD8D3C', 1] :
                d > 5 ? ['#FEB24C', 1] :
                d > 0 ? ['#FED976', 1] : ['grey', 0];
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

        $scope.football = {};
        $http.get("data/football.json").success(function(data, status) {
            var tempFootballJson = {};

            for (var i = 0; i < data.length; i++) {
                var country = data[i];
                tempFootballJson[country['alpha-3']] = country;
            }

            //then set on scope
            $scope.football = tempFootballJson;
    

        });

        $scope.countries = {};
        $http.get("data/all.json").success(function(data, status) {

           var tmpcountries = {};
                for (var i=0; i< data.length; i++) {
                    var country = data[i];
                    tmpcountries[country['alpha-3']] = country;
                }

            //then set on scope
            
            $scope.countries = tmpcountries;
            blah=tmpcountries;
            console.log($scope.countries)

        });


        // http://thematicmapping.org/downloads/world_borders.php
        // qgis to do centroids, move US, save as geojson
        $http.get("data/countriespt2.geojson").success(function(data, status) {
 

            angular.extend($scope, {
                geojson: {
                    data: data,
                    style: style,
                    resetStyleOnMouseout: true
                }
            });
        });
    



    }
]);
