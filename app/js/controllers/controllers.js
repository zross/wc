'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/
var blah;
myApp.controller('DemoController', ["$scope", "$http", '$q','$filter',
    function($scope, $http, $q, $filter) {

        $scope.footballSm = [{
            "alpha-3": "ARG",
            "country": "Argentina",
            "fifarank": 7,
            "fifarating": "1178.0",
            "spirank": 2,
            "spirating": 90.2,
            "attack": 2.9,
            "defense": 0.4,
            "fifaspidiff": 5,
            "fifaspiavg": 4.5,
            "Group": "F"
        }, {
            "alpha-3": "AUS",
            "country": "Australia",
            "fifarank": 59,
            "fifarating": "545.0",
            "spirank": 40,
            "spirating": 70.2,
            "attack": 1.7,
            "defense": 1.3,
            "fifaspidiff": 19,
            "fifaspiavg": 49.5,
            "Group": "B"
        }]
        $scope.orderByField = 'fifarank';
        $scope.reverseSort = false;
        $scope.limitGroup = 'A';
        $scope.geoTF = 'true'
        // $scope.search.country = '';
        // $scope.search.group = '';

        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            countryMouseover(leafletEvent);
        });


        $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {

            countryClick(featureSelected, leafletEvent);
        });

        function countryMouseover(leafletEvent) {
            var layer = leafletEvent.target;
            layer.setStyle({
                weight: 2,
                color: '#666',
                fillColor: 'white'
            });
            //layer.bringToFront();
        }

        $scope.$watch(
            "search.Group",
            function(newValue, oldValue) {

                // Ignore initial setup.
                if (newValue === oldValue) {

                    return;

                }
                var data = angular.copy($scope.footballgeo);
                var justGroup = _.filter(data.features, function(x) {
                    return x.properties.Group == newValue
                })


                data.features = justGroup
                $scope.geojson = {
                    data: data,
                    style: style,
                    resetStyleOnMouseout: true

                }


            }
        );

                $scope.$watch(
            "search.country",
            function(newValue, oldValue) {

                // Ignore initial setup.
                if (newValue === oldValue) {

                    return;

                }

        
         console.log($filter('filter')(['a', 'ba', 'c'], newValue))
         console.log($scope.football)



            }
        );


        // $scope.testFunc = function(thegroup) {
        // var data = $scope.footballgeo
        //   var justGroup =_.filter($scope.footballgeo.features, function(x){return x.properties.Group==thegroup})

        //     // if ($scope.geoTF) {
        //     //     $scope.geojson = []
        //     //     $scope.geoTF = false;
        //     // } else {

        //         data.features = justGroup
        //         $scope.geojson = {
        //             data: data,
        //             style: style,
        //             resetStyleOnMouseout: true

        //     }
        // }

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
                return Math.sqrt(1200 * 1 / d)
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
        $scope.footballgeo = {};
        $http.get("data/countriespt2.geojson").success(function(data, status) {
            //data.features = data.sort(propSort(["PARK_NAME"]));
            var featuresLim = []
            var minrank = 0
            for (var i = 0; i < data.features.length; i++) {

                var amatch = _.where($scope.football, {
                    "alpha-3": data.features[i].properties['ISO3']
                })

                if (amatch.length > 0) {

                    var feat = data.features[i]
                    var currank = amatch[0]['fifarank']


                    var curgroup = amatch[0]['Group']
                    feat.properties['fifarank'] = currank
                    feat.properties['Group'] = curgroup

                    featuresLim.push(feat)


                } //end if


            } //end loop through features
            featuresLim.sort(propSort("fifarank"));
            //featuresLim.sort(sortBy)

            data.features = featuresLim


            $scope.footballgeo = data
            angular.extend($scope, {
                geojson: {
                    data: data,
                    style: style,
                    resetStyleOnMouseout: true
                }
            }); //end extend
        }); //end get features

        function propSort(props) {
            return function sort(a, b) {
                var p;
                a = a.properties;
                b = b.properties;

                p = props;
                if (a[p] < b[p]) return -1;
                if (a[p] > b[p]) return 1;
            };
        }




    }
]);




myApp.controller("GoogleMapsController", ["$scope",
    function($scope) {
        angular.extend($scope, {
            berlin: {
                lat: 15.52,
                lng: 10.40,
                zoom: 2
            },
            layers: {
                baselayers: {
                    googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                        name: 'Google Hybrid',
                        layerType: 'HYBRID',
                        type: 'google'
                    },
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                    }
                }
            },
            defaults: {
                scrollWheelZoom: false
            }
        });
    }
]);
