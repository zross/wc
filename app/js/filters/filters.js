'use strict';

/* Filters */

myApp.filter('addExclamation', function(){

return function(myinput){

	return myinput + '!'

};

})
