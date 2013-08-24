/* global require, angular */

require(['config'], function(config) {
	
	'use strict';

	require.config({
		baseUrl: config.appDir,
		paths: {
			app: config.libDir + '/ng-app'
		}
	});
	
	require(
		[
			'app',
			'services/contactService'
		],
		function (app) {
			angular.bootstrap(document, [app.name]);
		});

});