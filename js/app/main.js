/* global require, angular */

(function() {

	'use strict';

	require(['config'], function(config) {
		
		require.config({
			baseUrl: config.appDir,
			paths: {
				app: config.libDir + '/ng-app'
			}
		});
		
		require(['app'], function (app) {	
			angular.bootstrap(document, [app.name]);
		});
	});

}());
