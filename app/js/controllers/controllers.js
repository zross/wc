'use strict';

/* Controllers DON'T MANIPULATE DOM WITH CONTROLLER ONLY WITH DIRECTIVE
MIGHT WANT TO USE NG-CLOAK SO WE DON'T SEE FLASHES OF UN PARSED DATA
OR PUT ANGULAR SCRIPT IN HEAD*/
var blah;
myApp.controller('DemoController', ["$scope", "$http", '$q', '$filter',
    function($scope, $http, $q, $filter) {

        $scope.orderByField = 'fifarank';
        $scope.reverseSort = false;
        // $scope.limitGroup = 'A';
        // $scope.geoTF = 'true'
        // $scope.search.country = '';
        // $scope.search.group = '';

        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            countryMouseover(leafletEvent);
        });


        $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {

            countryClick(featureSelected, leafletEvent);
        });



        $scope.$watchCollection(
            "search",
            function(newValue, oldValue) {

                // Ignore initial setup.
                if (newValue === oldValue) {

                    return;
                }
                var data = angular.copy($scope.footballgeo);
                console.log(newValue)
                var justGroup = _.filter(data.features, function(x) {
                    if (newValue.Group == '' || newValue.Group==undefined) {
                        
                        if (!newValue.country) {
                            console.log('In blank group:In blank country')
                            return true
                        } else {
                            console.log('In blank group:In NOT blank country')
                            return $filter('filter')([x.properties.country], newValue.country).length>0

                        }
                    } else {
                        console.log('In NOT blank group')
                        if (!newValue.country){
                            console.log('In NOT blank group: in blank country')
                        return x.properties.Group == newValue.Group
                    }else{
                        console.log('In NOT blank group: in NOTblank country')
                        return x.properties.Group == newValue.Group & $filter('filter')([x.properties.country], newValue.country).length>0
                    }
                    }

                })


                data.features = justGroup
                $scope.geojson = {
                    data: data,
                    style: style,
                    resetStyleOnMouseout: true

                }

            }
        );






        angular.extend($scope, {
            center: {
                lat: 40.8471,
                lng: 14.0625,
                zoom: 2
            },
            scrollWheelZoom: false,
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

var opac = 0.8
var circlecolors = {
    'A': {color: '#7fc97f', opacity:opac}, 
    'B': {color: '#beaed4', opacity:opac},
    'C': {color: '#fdc086', opacity:opac},
    'D': {color: '#ffff99', opacity:opac},
    'E': {color: '#386cb0', opacity:opac},
    'F': {color: '#f0027f', opacity:opac},
    'G': {color: '#bf5b17', opacity:opac},
    'H': {color: '#666666', opacity:opac}

}


function getColorFootball2(d){

    return circlecolors[d.Group] || {color: 'grey', opacity:0}

}



        function style(feature) {
            var vals = getColorFootball2($scope.footballObject[feature.properties.ISO3])
            var rads = getRadiusFootball($scope.footballObject[feature.properties.ISO3])
            return {
                fillColor: vals.color,
                radius: rads,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: vals.opacity
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
                    var curcountry = amatch[0]['country']
                    feat.properties['fifarank'] = currank
                    feat.properties['Group'] = curgroup
                    feat.properties['country'] = curcountry

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



        function countryMouseover(leafletEvent) {
            var layer = leafletEvent.target;
            layer.setStyle({
                weight: 2,
                color: '#666',
                fillColor: 'white'
            });
            //layer.bringToFront();
        }


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

//mapoptions
myApp.controller("GoogleMapsController", ["$scope",
    function($scope) {
        angular.extend($scope, {
            world: {
                lat: 15.52,
                lng: 10.40,
                zoom: 2
            },
            scrollwheel: false,
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
                scrollwheel: false
            }
        });
    }
]);
