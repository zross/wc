'use strict';


myApp.controller('DemoController', ["$scope", "$http", '$q', '$filter',
    function($scope, $http, $q, $filter) {

        $scope.search = {
            country: '',
            Group: ''
        }

        $scope.test = function(dat){
            console.log($scope.search)
             $scope.search.country = dat.country
        }

           function countryClick(country, event) {
                console.log(country.country);
            }

        $scope.orderByField = 'fifarank';

        $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
            countryMouseover(leafletEvent);
        });

       $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
                countryClick(featureSelected, leafletEvent);
            });

        $scope.$watchCollection("search",
            function(newValue, oldValue) {

                if (newValue === oldValue) {
                    return;
                }
                var data = angular.copy($scope.footballgeo);

                var justGroup = _.filter(data.features, function(x) {
                    if (newValue.Group == '' || newValue.Group == undefined) {

                        if (!newValue.country) {
                            return true
                        } else {
                            return $filter('filter')([x.properties.country], newValue.country).length > 0
                        }
                    } else {
                        if (!newValue.country) {
                            return x.properties.Group == newValue.Group
                        } else {
                            return x.properties.Group == newValue.Group & $filter('filter')([x.properties.country], newValue.country).length > 0
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


        var opac = 0.8
        var circlecolors = {
            'A': {
                color: '#7fc97f',
                opacity: opac
            },
            'B': {
                color: '#beaed4',
                opacity: opac
            },
            'C': {
                color: '#fdc086',
                opacity: opac
            },
            'D': {
                color: '#ffff99',
                opacity: opac
            },
            'E': {
                color: '#386cb0',
                opacity: opac
            },
            'F': {
                color: '#f0027f',
                opacity: opac
            },
            'G': {
                color: '#bf5b17',
                opacity: opac
            },
            'H': {
                color: '#666666',
                opacity: opac
            }

        }

            function getColorFootball(d) {

                return circlecolors[d.Group] || {
                    color: 'grey',
                    opacity: 0
                }

            }



            function style(feature) {
                var vals = getColorFootball($scope.footballObject[feature.properties.ISO3])
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
                    return Math.sqrt(1500 / d)
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
                    }
             
          
                }
            },
            defaults: {
                scrollwheel: false
            }
        });
    }
]);
