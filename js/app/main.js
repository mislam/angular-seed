/* global require, angular */

(function () {

	'use strict';

	var appDir = '/js/app',
		libDir = '/js/lib';

	require.config({
		baseUrl: appDir,
		paths: {
			route: libDir + '/ng-route',
			app: libDir + '/ng-app'
		}
	});

	require(['app', 'route'], function (app) {	
		angular.bootstrap(document, [app.name]);
	});

}());
