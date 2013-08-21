/* global require, angular */

require(['config'], function(config) {
	
	'use strict';

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
