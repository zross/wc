'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/
var blah;
myApp.controller('DemoController', ["$scope", "$http", '$q',
        function($scope, $http, $q) {

            // $scope.football=[ { "alpha-3" : "ARG", "country" : "Argentina", "fifarank" : 7, "fifarating" : "1178.0", "spirank" : 2, "spirating" : 90.2, "attack" : 2.9, "defense" : 0.4, "fifaspidiff" : 5, "fifaspiavg" : 4.5, "Group" : "F" }, { "alpha-3" : "AUS", "country" : "Australia", "fifarank" : 59, "fifarating" : "545.0", "spirank" : 40, "spirating" : 70.2, "attack" : 1.7, "defense" : 1.3, "fifaspidiff" : 19, "fifaspiavg" : 49.5, "Group" : "B" }, { "alpha-3" : "BEL", "country" : "Belgium", "fifarank" : 12, "fifarating" : "1039.0", "spirank" : 13, "spirating" : 80.9, "attack" : 2.1, "defense" : 0.8, "fifaspidiff" : -1, "fifaspiavg" : 12.5, "Group" : "H" }, { "alpha-3" : "BIH", "country" : "Bosnia-Herzegovina", "fifarank" : 25, "fifarating" : "795.0", "spirank" : 15, "spirating" : 79.5, "attack" : 2.3, "defense" : 1, "fifaspidiff" : 10, "fifaspiavg" : 20, "Group" : "F" }, { "alpha-3" : "BRA", "country" : "Brazil", "fifarank" : 4, "fifarating" : "1210.0", "spirank" : 1, "spirating" : 91.8, "attack" : 3.4, "defense" : 0.5, "fifaspidiff" : 3, "fifaspiavg" : 2.5, "Group" : "A" }, { "alpha-3" : "CHE", "country" : "Switzerland", "fifarank" : 8, "fifarating" : "1161.0", "spirank" : 22, "spirating" : 77.4, "attack" : 2, "defense" : 1, "fifaspidiff" : -14, "fifaspiavg" : 15, "Group" : "E" }, { "alpha-3" : "CHL", "country" : "Chile", "fifarank" : 13, "fifarating" : "1037.0", "spirank" : 5, "spirating" : 87.2, "attack" : 2.8, "defense" : 0.7, "fifaspidiff" : 8, "fifaspiavg" : 9, "Group" : "B" }, { "alpha-3" : "CIV", "country" : "Ivory Coast", "fifarank" : 21, "fifarating" : "830", "spirank" : 16, "spirating" : 79.3, "attack" : 2.3, "defense" : 1, "fifaspidiff" : 5, "fifaspiavg" : 18.5, "Group" : "C" }, { "alpha-3" : "CMR", "country" : "Cameroon", "fifarank" : 50, "fifarating" : "583.0", "spirank" : 38, "spirating" : 71, "attack" : 1.5, "defense" : 1, "fifaspidiff" : 12, "fifaspiavg" : 44, "Group" : "A" }, { "alpha-3" : "COL", "country" : "Colombia", "fifarank" : 5, "fifarating" : "1186.0", "spirank" : 6, "spirating" : 86.1, "attack" : 2.2, "defense" : 0.4, "fifaspidiff" : -1, "fifaspiavg" : 5.5, "Group" : "C" }, { "alpha-3" : "CRI", "country" : "Costa Rica", "fifarank" : 34, "fifarating" : "748.0", "spirank" : 24, "spirating" : 76.7, "attack" : 1.4, "defense" : 0.6, "fifaspidiff" : 10, "fifaspiavg" : 29, "Group" : "D" }, { "alpha-3" : "DEU", "country" : "Germany", "fifarank" : 2, "fifarating" : "1340.0", "spirank" : 4, "spirating" : 88.7, "attack" : 3.1, "defense" : 0.7, "fifaspidiff" : -2, "fifaspiavg" : 3, "Group" : "G" }, { "alpha-3" : "DZA", "country" : "Algeria", "fifarank" : 25, "fifarating" : "795.0", "spirank" : 69, "spirating" : 62.9, "attack" : 1.1, "defense" : 1.2, "fifaspidiff" : -44, "fifaspiavg" : 47, "Group" : "H" }, { "alpha-3" : "ECU", "country" : "Ecuador", "fifarank" : 28, "fifarating" : "794.0", "spirank" : 11, "spirating" : 82, "attack" : 2, "defense" : 0.7, "fifaspidiff" : 17, "fifaspiavg" : 19.5, "Group" : "E" }, { "alpha-3" : "ESP", "country" : "Spain", "fifarank" : 1, "fifarating" : "1460.0", "spirank" : 3, "spirating" : 89.3, "attack" : 2.8, "defense" : 0.5, "fifaspidiff" : -2, "fifaspiavg" : 2, "Group" : "B" }, { "alpha-3" : "FRA", "country" : "France", "fifarank" : 16, "fifarating" : "935.0", "spirank" : 7, "spirating" : 85.3, "attack" : 2.4, "defense" : 0.6, "fifaspidiff" : 9, "fifaspiavg" : 11.5, "Group" : "E" }, { "alpha-3" : "GBR", "country" : "England", "fifarank" : 11, "fifarating" : "1043.0", "spirank" : 9, "spirating" : 83.2, "attack" : 2.2, "defense" : 0.7, "fifaspidiff" : 2, "fifaspiavg" : 10, "Group" : "D" }, { "alpha-3" : "GHA", "country" : "Ghana", "fifarank" : 38, "fifarating" : "713", "spirank" : 26, "spirating" : 76.7, "attack" : 1.6, "defense" : 0.7, "fifaspidiff" : 12, "fifaspiavg" : 32, "Group" : "G" }, { "alpha-3" : "GRC", "country" : "Greece", "fifarank" : 10, "fifarating" : "1082.0", "spirank" : 27, "spirating" : 76, "attack" : 1.4, "defense" : 0.6, "fifaspidiff" : -17, "fifaspiavg" : 18.5, "Group" : "C" }, { "alpha-3" : "HND", "country" : "Honduras", "fifarank" : 30, "fifarating" : "759.0", "spirank" : 33, "spirating" : 73.4, "attack" : 1.7, "defense" : 1, "fifaspidiff" : -3, "fifaspiavg" : 31.5, "Group" : "E" }, { "alpha-3" : "HRV", "country" : "Croatia", "fifarank" : 20, "fifarating" : "871.0", "spirank" : 30, "spirating" : 75.2, "attack" : 1.7, "defense" : 0.9, "fifaspidiff" : -10, "fifaspiavg" : 25, "Group" : "A" }, { "alpha-3" : "IRN", "country" : "Iran", "fifarank" : 37, "fifarating" : "715.0", "spirank" : 39, "spirating" : 70.7, "attack" : 1.4, "defense" : 1, "fifaspidiff" : -2, "fifaspiavg" : 38, "Group" : "F" }, { "alpha-3" : "ITA", "country" : "Italy", "fifarank" : 9, "fifarating" : "1115.0", "spirank" : 12, "spirating" : 81.1, "attack" : 2.1, "defense" : 0.8, "fifaspidiff" : -3, "fifaspiavg" : 10.5, "Group" : "D" }, { "alpha-3" : "JPN", "country" : "Japan", "fifarank" : 47, "fifarating" : "613.0", "spirank" : 36, "spirating" : 72.7, "attack" : 1.9, "defense" : 1.2, "fifaspidiff" : 11, "fifaspiavg" : 41.5, "Group" : "C" }, { "alpha-3" : "KOR", "country" : "South Korea", "fifarank" : 55, "fifarating" : "551.0", "spirank" : 31, "spirating" : 73.5, "attack" : 1.7, "defense" : 1, "fifaspidiff" : 24, "fifaspiavg" : 43, "Group" : "H" }, { "alpha-3" : "MEX", "country" : "Mexico", "fifarank" : 19, "fifarating" : "877.0", "spirank" : 25, "spirating" : 76.7, "attack" : 1.6, "defense" : 0.7, "fifaspidiff" : -6, "fifaspiavg" : 22, "Group" : "A" }, { "alpha-3" : "NGA", "country" : "Nigeria", "fifarank" : 44, "fifarating" : "631.0", "spirank" : 28, "spirating" : 75.9, "attack" : 1.7, "defense" : 0.9, "fifaspidiff" : 16, "fifaspiavg" : 36, "Group" : "F" }, { "alpha-3" : "NLD", "country" : "Netherlands", "fifarank" : 15, "fifarating" : "967.0", "spirank" : 10, "spirating" : 82.3, "attack" : 2.4, "defense" : 0.9, "fifaspidiff" : 5, "fifaspiavg" : 12.5, "Group" : "B" }, { "alpha-3" : "PRT", "country" : "Portugal", "fifarank" : 3, "fifarating" : "1245.0", "spirank" : 14, "spirating" : 79.6, "attack" : 2.1, "defense" : 0.9, "fifaspidiff" : -11, "fifaspiavg" : 8.5, "Group" : "G" }, { "alpha-3" : "RUS", "country" : "Russia", "fifarank" : 18, "fifarating" : "903.0", "spirank" : 17, "spirating" : 78.9, "attack" : 1.7, "defense" : 0.7, "fifaspidiff" : 1, "fifaspiavg" : 17.5, "Group" : "H" }, { "alpha-3" : "URY", "country" : "Uruguay", "fifarank" : 6, "fifarating" : "1181.0", "spirank" : 8, "spirating" : 84.1, "attack" : 2.4, "defense" : 0.7, "fifaspidiff" : -2, "fifaspiavg" : 7, "Group" : "D" }, { "alpha-3" : "USA", "country" : "United States", "fifarank" : 14, "fifarating" : "1015.0", "spirank" : 21, 
            // "spirating" : 77.6, "attack" : 2.1, "defense" : 1, "fifaspidiff" : -7, "fifaspiavg" : 17.5, "Group" : "G" } ]

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

            var tilesDict = {
                openstreetmap: {
                    url: "http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png",
                    options: {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                opencyclemap: {
                    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    options: {
                        attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                    }
                }
            };

            angular.extend($scope, {
                center: {
                    lat: 40.8471,
                    lng: 14.0625,
                    zoom: 2
                },
                scrollWheelZoom: false,
                tiles: 'a',
                legend: {
                    colors: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
                    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
                }
            });

            // http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png
            // In the URL below, replace 'examples.map-zr0njcqy' with your map id.
            //var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png

            function countryClick(country, event) {
                console.log(country.properties.name);
            }


            // function getColorFootball(d) {

            //     if (d) {
            //         d = d['fifarank']
            //     }
            //     return d > 35 ? ['#800026', 0.8] :
            //         d > 25 ? ['#BD0026', 0.8] :
            //         d > 20 ? ['#E31A1C', 0.8] :
            //         d > 15 ? ['#FC4E2A', 0.8] :
            //         d > 10 ? ['#FD8D3C', 0.8] :
            //         d > 5 ? ['#FEB24C', 0.8] :
            //         d > 0 ? ['#FED976', 0.8] : 
            //         ['grey', 0];
            // }

            function getColorFootball(d) {
                var col = ['grey', 0]

                if (d) {
                    d = d['Group']
                    if (d == 'A') {
                        col = ['#7fc97f', 0.8]
                    }
                    if (d == 'B') {
                        col = ['#beaed4', 0.8]
                    }
                    if (d == 'C') {
                        col = ['#fdc086', 0.8]
                    }
                    if (d == 'D') {
                        col = ['#ffff99', 0.8]
                    }
                    if (d == 'E') {
                        col = ['#386cb0', 0.8]
                    }
                    if (d == 'F') {
                        col = ['#f0027f', 0.8]
                    }
                    if (d == 'G') {
                        col = ['#bf5b17', 0.8]
                    }
                    if (d == 'H') {
                        col = ['#666666', 0.8]
                    }

                }
                return col
            }

            function style(feature) {
                var vals = getColorFootball($scope.footballObject[feature.properties.ISO3])
                var rads = getRadiusFootball($scope.footballObject[feature.properties.ISO3])
                return {
                    fillColor: vals[0],
                    radius: rads,
                    color: "#000",
                    weight: 1,
                    opacity: vals[1],
                    fillOpacity: vals[1]
                };
            }


            function getRadiusFootball(d) {


                if (d) {
                    d = d['fifarank']
                    return Math.sqrt(700 * 1 / d)
                } else {
                    return 0
                }
            }


                $scope.football = [];
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




                }]);
