'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  myApp.directive('fix', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                // console.log(value);
                if ( value === null ) {
                    value = '';
                }
                // console.log(value);
                return value;
            });
        }
    };
});
