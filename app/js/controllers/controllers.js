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
            colors: ['#7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f','#bf5b17','#666666'],
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


function getRadiusFootball(d) {

    if (d) {
        d = d['fifarank']
        return Math.sqrt(700 * 1 / d)
    } else {
        return 0
    }

}





function style(feature) {
    var vals = getColorFootball($scope.football[feature.properties.ISO3])
    var rads = getRadiusFootball($scope.football[feature.properties.ISO3])
    return {
        fillColor: vals[0],
        radius: rads,
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
